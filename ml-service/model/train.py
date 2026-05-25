import pandas as pd
import numpy as np
import joblib
import os
import sys
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score

# Add the app directory to sys.path to import FeatureExtractor
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'app'))
from feature_extractor import FeatureExtractor

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
MODEL_DIR = os.path.dirname(os.path.abspath(__file__))

def prepare_data(sample_size=10000):
    print(f"Preparing data (sample size: {sample_size} per class)...")
    
    # 1. Load Phishing URLs
    phish_df = pd.read_csv(os.path.join(DATA_DIR, "phishing_urls.csv"))
    phish_urls = phish_df['url'].sample(n=min(sample_size, len(phish_df)), random_state=42).tolist()
    
    # 2. Load Legitimate URLs (Tranco)
    legit_df = pd.read_csv(os.path.join(DATA_DIR, "legitimate_urls.csv"), header=None, names=['rank', 'domain'])
    # Mix http and https, and randomly add 'www.' for legitimate URLs
    def add_protocol_and_www(domain):
        domain_str = str(domain)
        protocol = "https://" if np.random.random() > 0.5 else "http://"
        # 70% chance to add 'www.' for better coverage
        if np.random.random() > 0.3 and not domain_str.startswith('www.'):
            return f"{protocol}www.{domain_str}"
        return f"{protocol}{domain_str}"
    
    legit_urls = legit_df['domain'].dropna().sample(n=min(sample_size, len(legit_df)), random_state=42).apply(add_protocol_and_www).tolist()
    
    # 3. Extract Features
    extractor = FeatureExtractor()
    
    data = []
    labels = []
    
    print("Extracting features for phishing URLs...")
    for url in phish_urls:
        try:
            features = extractor.extract_features(url)
            data.append(features)
            labels.append(1) # Phishing
        except:
            continue
            
    print("Extracting features for legitimate URLs...")
    for url in legit_urls:
        try:
            features = extractor.extract_features(url)
            data.append(features)
            labels.append(0) # Legitimate
        except:
            continue
            
    df = pd.DataFrame(data)
    return df, np.array(labels)

def train_model():
    X, y = prepare_data(sample_size=15000)
    
    print(f"Dataset size: {len(X)} samples")
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest model...")
    rf = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
    rf.fit(X_train, y_train)
    
    # Evaluate
    y_pred = rf.predict(X_test)
    print("\nModel Evaluation:")
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save model and feature names
    model_path = os.path.join(MODEL_DIR, "phishing_model.pkl")
    joblib.dump(rf, model_path)
    
    # Save feature names to ensure consistent order during prediction
    features_path = os.path.join(MODEL_DIR, "features.joblib")
    joblib.dump(X.columns.tolist(), features_path)
    
    print(f"Model saved to {model_path}")
    print(f"Feature list saved to {features_path}")

if __name__ == "__main__":
    train_model()
