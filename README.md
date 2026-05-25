# PhishGuard — Phishing URL Detection

PhishGuard is a full‑stack phishing URL detection app with a React frontend, Node/Express backend, and a Python ML service that classifies URLs as **PHISHING** or **SAFE**.

## Project Structure
- client/ — React UI (Vite + Tailwind)
- server/ — Node/Express API + persistence
- ml-service/ — FastAPI ML service + feature extraction + model

## Prerequisites
- Node.js 18+
- Python 3.10+

## Setup

### 1) Backend API
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### 2) ML Service
```bash
cd ml-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3) Frontend
```bash
cd client
npm install
npm run dev
```

## Notes
- The frontend expects the backend at http://localhost:5001.
- The backend calls the ML service at the URL defined by `ML_SERVICE_URL` in the server `.env`.

## Training (Optional)
If you want to retrain the model, see:
- ml-service/model/train.py
- ml-service/data/fetch_datasets.py
