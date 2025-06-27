from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import load_model
from predictor import loadEncoder, predictOnDataFrame
from scraper import make_review
from pymongo import MongoClient
import pandas as pd

# Load models and encoder
def load_models():
    model1 = load_model("models/RNN.h5")
    model2 = load_model("models/GRU.h5")
    model3 = load_model("models/LSTM.h5")
    return model1, model2, model3

dictionary = loadEncoder()
model1, model2, model3 = load_models()

# Initialize app
app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['reviews']

@app.route('/dataset-analysis', methods=['POST'])
def make_analysis():
    data = request.get_json()

    if not data or 'ImdbId' not in data or 'limit' not in data:
        return jsonify({'error': 'Invalid input data'}), 400

    ImdbId = data['ImdbId']
    limit = int(data['limit'])

    collection_name = f'reviews_{ImdbId}'
    collection = db[collection_name]

    existing_count = collection.count_documents({})

    try:
        # Use existing if enough reviews are present
        if collection_name in db.list_collection_names() and existing_count >= limit:
            result = list(collection.find({}, {'_id': 1, 'reviews': 1, 'sentiment': 1}).limit(limit))

        else:
            # Scrape new reviews
            df = make_review(ImdbId, limit)

            if existing_count > 0:
                df = df[existing_count:]  # Get only new reviews

            if not df.empty:
                df = predictOnDataFrame(df, "review", model1, model2, model3, dictionary)
                collection.insert_many(df.to_dict(orient='records'))

            result = list(collection.find({}, {'_id': 1, 'reviews': 1, 'sentiment': 1}).limit(limit))

        for doc in result:
            doc['_id'] = str(doc['_id'])

        return jsonify(result)

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
