# 🛡️ CLAUDE.md — Phishing URL Detector
> Project Intelligence File — Read before touching ANY code.

---

## 📌 PROJECT OVERVIEW

| Field | Detail |
|---|---|
| **Project Name** | PhishGuard |
| **Goal** | Detect malicious/phishing URLs using ML + serve via Node.js API |
| **Type** | Full-Stack Security ML Web App |
| **Resume Target** | Cybersecurity + ML + Distributed Systems |
| **Estimated Timeline** | 3–4 weeks (solo dev) |

---

## 🏗️ ARCHITECTURE

```
┌─────────────────────────────────────────────────────┐
│                   REACT FRONTEND                    │
│         (URL Input → Results → History Dashboard)   │
└────────────────────┬────────────────────────────────┘
                     │ HTTP (Axios)
┌────────────────────▼────────────────────────────────┐
│              NODE.JS + EXPRESS BACKEND              │
│         (API Gateway, Auth, Rate Limiting,          │
│          Logging, MongoDB integration)              │
└────────────────────┬────────────────────────────────┘
                     │ Internal REST (Axios)
┌────────────────────▼────────────────────────────────┐
│            PYTHON + FASTAPI (ML ENGINE)             │
│       (Feature Extraction → ML Model → Predict)    │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│          SCIKIT-LEARN MODEL (.pkl file)             │
│         (Random Forest / Gradient Boosting)         │
└─────────────────────────────────────────────────────┘
```

---

## 🧰 EXACT TECH STACK

### Frontend
| Tool | Purpose |
|---|---|
| React 18 | UI Framework |
| Tailwind CSS | Styling |
| Recharts | Threat visualization charts |
| Axios | API calls to Node backend |
| React Query | Server state management |

### Backend (Node.js)
| Tool | Purpose |
|---|---|
| Node.js (v20+) | Runtime |
| Express.js | REST API framework |
| Mongoose | MongoDB ODM |
| express-rate-limit | Prevent API abuse |
| helmet.js | Security headers |
| dotenv | Environment config |
| winston | Logging |
| axios | Calls to Python microservice |

### ML Microservice (Python)
| Tool | Purpose |
|---|---|
| Python 3.10+ | Runtime |
| FastAPI | ML API server |
| Uvicorn | ASGI server |
| Scikit-learn | ML model (Random Forest) |
| pandas | Data manipulation |
| numpy | Numerical ops |
| tldextract | URL parsing |
| python-whois | WHOIS domain lookup |
| joblib | Model serialization (.pkl) |
| requests | Dataset fetching |

### Database & DevOps
| Tool | Purpose |
|---|---|
| MongoDB Atlas | Store scan history, results |
| Docker + Docker Compose | Containerize Node + Python services |
| GitHub Actions | CI/CD pipeline |
| .env files | Secrets management |

### Dataset
| Source | Link |
|---|---|
| PhishTank | https://www.phishtank.com/developer_info.php |
| OpenPhish (Community) | https://openphish.com/feed.txt |
| ISCX-URL-2016 | Academic dataset (Kaggle) |
| Tranco List | https://tranco-list.eu/ (Successor to Alexa Top 1M) |

---

## 📁 FOLDER STRUCTURE

```
PhishGuard/
│
├── client/                        # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── URLScanner.jsx     # Main input component
│   │   │   ├── ResultCard.jsx     # Shows SAFE/PHISHING verdict
│   │   │   ├── HistoryTable.jsx   # Past scan history
│   │   │   └── ThreatChart.jsx    # Recharts visualization
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js             # Axios instance
│   │   └── App.jsx
│   ├── .env
│   └── package.json
│
├── server/                        # Node.js Backend
│   ├── src/
│   │   ├── routes/
│   │   │   ├── scan.routes.js     # POST /api/scan
│   │   │   └── history.routes.js  # GET /api/history
│   │   ├── controllers/
│   │   │   ├── scan.controller.js
│   │   │   └── history.controller.js
│   │   ├── models/
│   │   │   └── Scan.model.js      # MongoDB schema
│   │   ├── middleware/
│   │   │   ├── rateLimiter.js
│   │   │   ├── validator.js       # URL validation
│   │   │   └── errorHandler.js
│   │   ├── services/
│   │   │   └── mlService.js       # Calls Python microservice
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   └── app.js
│   ├── .env
│   └── package.json
│
├── ml-service/                    # Python ML Engine
│   ├── app/
│   │   ├── main.py                # FastAPI entry point
│   │   ├── predictor.py           # Load model + predict
│   │   ├── feature_extractor.py   # Extract URL features
│   │   └── schemas.py             # Pydantic models
│   ├── model/
│   │   ├── train.py               # Model training script
│   │   ├── evaluate.py            # Accuracy metrics
│   │   └── phishing_model.pkl     # Saved trained model
│   ├── data/
│   │   ├── phishing_urls.csv
│   │   └── legitimate_urls.csv
│   ├── requirements.txt
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
├── README.md
└── CLAUDE.md                      # This file
```

---

## ⚙️ FEATURE EXTRACTION (ML Inputs)

These are the features your ML model will train on. Extract from every URL:

### Lexical Features (from URL string itself)
| Feature | Description |
|---|---|
| `url_length` | Total character length of URL |
| `num_dots` | Number of dots in URL |
| `num_hyphens` | Number of hyphens |
| `num_underscores` | Number of underscores |
| `num_slashes` | Number of forward slashes |
| `num_subdomains` | Count of subdomain levels |
| `has_ip_address` | Boolean: IP used instead of domain |
| `has_at_symbol` | Boolean: `@` present in URL |
| `has_double_slash` | Boolean: `//` redirect present |
| `entropy` | Shannon entropy of URL (high = suspicious) |
| `digit_ratio` | Ratio of digits to total characters |
| `special_char_count` | Count of `%`, `=`, `?`, `&` etc. |

### Domain Features
| Feature | Description |
|---|---|
| `domain_age_days` | Age of domain from WHOIS (new = suspicious) |
| `domain_length` | Length of root domain |
| `tld` | Top-level domain (.xyz, .tk = red flags) |
| `is_https` | Boolean: HTTPS used or not |
| `is_shortened` | Boolean: bit.ly, tinyurl, etc. |

### Path/Query Features
| Feature | Description |
|---|---|
| `path_depth` | Folder depth in URL path |
| `has_redirect` | Boolean: `redirect=` in query params |
| `query_length` | Length of query string |

---

## 🤖 ML MODEL PLAN

### Model Choice
- **Primary**: Random Forest Classifier (best accuracy/interpretability tradeoff)
- **Secondary**: Gradient Boosting (XGBoost) — try if RF underperforms
- **Anomaly fallback**: Isolation Forest for unseen attack patterns

### Training Steps
1. Download PhishTank + Alexa datasets
2. Extract features for all URLs using `feature_extractor.py`
3. Label: `1 = phishing`, `0 = legitimate`
4. Train/test split: 80/20
5. Train Random Forest with cross-validation
6. Evaluate: Accuracy, Precision, Recall, F1, ROC-AUC
7. Serialize with `joblib.dump()` → `phishing_model.pkl`
8. Load pkl in FastAPI at startup

### Target Metrics
| Metric | Minimum Acceptable | Resume Claim Goal |
|---|---|---|
| Accuracy | > 92% | 95%+ |
| Precision | > 90% | 93%+ |
| Recall | > 90% | 93%+ |
| F1 Score | > 0.91 | 0.94+ |

---

## 🔌 API CONTRACTS

### Node.js → Frontend

#### `POST /api/scan`
```json
Request:
{ "url": "https://suspicious-site.xyz/login?redirect=bank" }

Response:
{
  "url": "https://suspicious-site.xyz/...",
  "verdict": "PHISHING",
  "confidence": 96.4,
  "features": { "has_ip": false, "domain_age": 3, ... },
  "scannedAt": "2025-05-10T12:00:00Z",
  "scanId": "abc123"
}
```

#### `GET /api/history?limit=20&page=1`
```json
Response:
{
  "total": 150,
  "scans": [ { "url": "...", "verdict": "SAFE", ... } ]
}
```

### Node.js → Python ML Service

#### `POST /predict`
```json
Request:
{ "url": "https://suspicious-site.xyz/login" }

Response:
{
  "verdict": "PHISHING",
  "confidence": 96.4,
  "features_used": { "url_length": 45, "domain_age": 3, ... }
}
```

---

## ✅ WHAT TO DO

- ✅ Train model on **balanced dataset** (equal phishing + legit samples)
- ✅ Validate URL format in Node middleware BEFORE sending to Python
- ✅ Return **confidence score** (not just label) — more useful, more impressive
- ✅ Store every scan in MongoDB for history dashboard
- ✅ Use **Docker Compose** so both services start with one command
- ✅ Add **rate limiting** on Node API (prevent abuse)
- ✅ Add `helmet.js` for security headers on Node server
- ✅ Log all predictions with timestamps using winston
- ✅ Use `.env` files for all secrets (never hardcode)
- ✅ Write a proper `README.md` with setup instructions + screenshots
- ✅ Push code to GitHub with clear commit history
- ✅ Add a live demo link:
    - Frontend: Vercel (Free, Global CDN)
    - Node Backend: Render (Free Tier + UptimeRobot "Warm-up")
    - ML Service: Hugging Face Spaces (Free, ML-optimized)

---

## ❌ WHAT NOT TO DO

- ❌ **Do NOT use real live user URLs** as training data without consent
- ❌ **Do NOT skip URL validation** — malformed input will crash Python service
- ❌ **Do NOT expose Python ML service port publicly** — keep it internal only
- ❌ **Do NOT hardcode API keys or MongoDB URI** in source code
- ❌ **Do NOT train on only phishing URLs** — model needs equal legit samples or it will overfit
- ❌ **Do NOT use synchronous WHOIS lookups** in the prediction path — causes timeouts. Pre-compute or cache WHOIS features
- ❌ **Do NOT use `eval()` or `exec()`** anywhere — massive security hole
- ❌ **Do NOT store raw URLs in logs** — mask/hash them for privacy
- ❌ **Do NOT deploy without a "Warm-up" strategy** — free tier cold starts look unprofessional to recruiters. Use UptimeRobot/Cron-job.org to ping the `/api/health` every 14 mins.
- ❌ **Do NOT skip CORS config** on Node — frontend will be blocked
- ❌ **Do NOT ignore model retraining** — phishing URLs evolve. Plan for periodic retraining

---

## ⚠️ POSSIBLE THREATS & RISKS

### To Your Application (Security Risks)
| Threat | Risk | Mitigation |
|---|---|---|
| **SSRF via URL input** | Attacker sends internal URLs to probe your server | Validate URL is external + public IP before processing |
| **API Abuse / DDoS** | Flood `/api/scan` with thousands of requests | `express-rate-limit`: 10 requests/min per IP |
| **Prompt/URL Injection** | Specially crafted URLs break feature extraction | Sanitize + validate URL with regex before any processing |
| **Model Poisoning** | Tampered training data tricks model | Use verified datasets only (PhishTank, ISCX) |
| **MongoDB Injection** | Malicious query operators in input | Use Mongoose schema validation + never use `$where` |
| **Exposed Python Port** | Direct ML service access bypasses Node validation | Only allow internal Docker network calls to Python service |
| **Stale Model** | Model becomes inaccurate as new phishing evolves | Add `model_version` field, plan monthly retraining |
| **CORS Misconfiguration** | Unintended origins can call your API | Explicitly whitelist frontend origin in Node CORS config |

### To ML Accuracy (Model Risks)
| Risk | Description | Fix |
|---|---|---|
| **False Negatives** | Real phishing URL marked SAFE | Increase recall weight in training, lower decision threshold |
| **False Positives** | Legit URL marked PHISHING | Improve feature engineering, use wider legit dataset |
| **Class Imbalance** | More legit than phishing samples | Use SMOTE oversampling or `class_weight='balanced'` |
| **URL Shorteners** | bit.ly hides real destination | Expand shortened URLs before analysis |
| **Domain Age WHOIS failures** | WHOIS lookup times out | Default to `age = -1` (unknown), don't block prediction |

---

## 📈 DEVELOPMENT ROADMAP

### Week 1 — ML Foundation
- [ ] Download and clean PhishTank + Alexa datasets
- [ ] Build `feature_extractor.py`
- [ ] Train Random Forest model
- [ ] Evaluate and tune model (target 94%+ F1)
- [ ] Serialize model to `phishing_model.pkl`

### Week 2 — Backend
- [ ] Setup FastAPI with `/predict` endpoint
- [ ] Setup Node.js + Express with routes
- [ ] Connect MongoDB via Mongoose
- [ ] Add `mlService.js` to proxy Node → Python
- [ ] Add rate limiting, helmet, CORS, validation middleware

### Week 3 — Frontend
- [ ] Build URL input + verdict result card
- [ ] Build scan history table with pagination
- [ ] Build threat distribution chart (Recharts)
- [ ] Connect frontend to Node API via Axios
- [ ] Polish UI with Tailwind

### Week 4 — Polish & Deploy
- [ ] Write Docker + Docker Compose setup
- [ ] Write comprehensive README with screenshots
- [ ] Deploy Node → Render (Free Tier)
- [ ] Deploy Python → Hugging Face Spaces (ML Optimized)
- [ ] Deploy Frontend → Vercel
- [ ] Setup UptimeRobot to ping endpoints (prevents sleep)
- [ ] Test end-to-end with 20+ sample URLs
- [ ] Record demo GIF for portfolio

---

## 🏆 RESUME BULLET POINTS (Copy-Paste Ready)

```
• Built a full-stack Phishing URL Detection system using a Random Forest ML model 
  (94%+ F1 score) served via a Python FastAPI microservice, with a Node.js/Express 
  API gateway and React dashboard — classified 1M+ URLs from PhishTank/ISCX datasets.

• Engineered 20+ URL-based features (domain age, entropy, subdomain depth, TLD risk) 
  for ML classification; deployed using Docker Compose with MongoDB for scan history 
  persistence and rate-limited REST APIs.

• Designed a distributed microservice architecture separating ML inference (Python/FastAPI) 
  from business logic (Node.js/Express), enabling independent scaling and deployment 
  on cloud platforms.
```

---

## 🔗 USEFUL RESOURCES

| Resource | Link |
|---|---|
| PhishTank API Docs | https://www.phishtank.com/developer_info.php |
| ISCX URL Dataset (Kaggle) | https://www.kaggle.com/datasets/sid321axn/malicious-urls-dataset |
| FastAPI Docs | https://fastapi.tiangolo.com |
| Scikit-learn Random Forest | https://scikit-learn.org/stable/modules/ensemble.html#forest |
| tldextract library | https://github.com/john-kurkowski/tldextract |
| express-rate-limit | https://github.com/express-rate-limit/express-rate-limit |
| Docker Compose Guide | https://docs.docker.com/compose/gettingstarted |

---

*Last Updated: May 2026 | Author: Project Dev*