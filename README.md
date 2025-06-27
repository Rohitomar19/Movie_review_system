# 🎬 Movie Review System

A full-stack web application that allows users to submit movie reviews, view aggregated sentiments, and get personalized recommendations. Built using modern web technologies and integrated with a sentiment analysis model.

## 🚀 Features

- 🔍 Search for movies
- ✍️ Submit reviews and ratings
- 😊 Sentiment analysis of reviews (Positive, Neutral, Negative)
- 📈 Dashboard with review analytics
- 🧠 ML model to analyze review sentiment
- 💡 Movie recommendation system based on user preferences

## 🛠️ Tech Stack

### Frontend
- React.js 
- HTML5, CSS3
- Axios for API requests

### Backend
- Python (Flask / FastAPI)
- RESTful API
- Sentiment Analysis using TensorFlow / Scikit-learn
- MongoDB / PostgreSQL (for storing user reviews and metadata)

### ML/NLP
- Pre-trained NLP model (e.g., BERT, LSTM, or custom-trained model)
- Text preprocessing with NLTK / spaCy

## 📂 Project Structure

movie-review-system/
│
├── client/                    # Frontend - React App
│   ├── public/
│   └── src/
│       ├── app/              # Redux store
│       ├── assets/           # Static assets
│       ├── components/       # UI Components (About, Admin, Navbar, etc.)
│       ├── context/          # React Contexts (e.g., ThemeContext)
│       ├── features/
│       │   └── user/         # Redux slice for user state
│       ├── images/           # Image assets
│       ├── App.jsx           # Root component
│       ├── main.jsx          # App entry point
│       └── index.css         # Global styles
│
├── server/                   # Backend - Node.js + Express
│   ├── controllers/          # Route logic (e.g., user, profile)
│   ├── middleware/           # Auth middlewares
│   ├── models/               # Mongoose models
│   ├── routes/               # API route handlers (movie, profile, user)
│   ├── services/             # Service logic (DB connection, auth)
│   └── index.js              # Entry point of Express app
│
├── pybackend/                # Python backend for ML model
│   ├── models/               # Trained models (GRU.h5, LSTM.h5, etc.)
│   ├── app.py                # Flask app or FastAPI app
│   ├── pre_process.py        # Text preprocessing logic
│   ├── predictor.py          # Prediction logic using ML model
│   ├── encode_map            # Label encoder/decoder mappings
│   ├── scraper.py            # Optional: data scraping
│   └── prototype.py          # Experimentation scripts
│
├── .gitignore
├── README.md
