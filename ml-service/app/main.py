from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os
import sys
import uvicorn
from typing import Dict, Any

# Add paths to import FeatureExtractor
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from feature_extractor import FeatureExtractor

app = FastAPI(title="PhishGuard ML Service")

# Load model and features
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'model', 'phishing_model.pkl')
FEATURES_PATH = os.path.join(os.path.dirname(__file__), '..', 'model', 'features.joblib')

model = None
feature_list = None
extractor = FeatureExtractor()

@app.on_event("startup")
def load_model():
    global model, feature_list
    if os.path.exists(MODEL_PATH) and os.path.exists(FEATURES_PATH):
        model = joblib.load(MODEL_PATH)
        feature_list = joblib.load(FEATURES_PATH)
        print("Model and feature list loaded successfully.")
    else:
        print(f"Warning: Model not found at {MODEL_PATH}. Please run training first.")

class PredictionRequest(BaseModel):
    url: str

class PredictionResponse(BaseModel):
    verdict: str
    confidence: float
    features_used: Dict[str, Any]

@app.post("/predict")
def predict(request: PredictionRequest):
    if model is None or feature_list is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Please train the model.")
    
    try:
        # Extract features
        features = extractor.extract_features(request.url)
        
        # Prepare data in the same order as training
        input_data = []
        for feat in feature_list:
            input_data.append(features.get(feat, 0))
            
        # Predict
        prediction = model.predict([input_data])[0]
        probabilities = model.predict_proba([input_data])[0]
        
        verdict = "PHISHING" if prediction == 1 else "SAFE"
        confidence = float(max(probabilities) * 100)
        
        return {
            "verdict": verdict,
            "confidence": round(confidence, 2),
            "features_used": features
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model is not None}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
