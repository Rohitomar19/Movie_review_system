import numpy as np
import pickle
import cleantext
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Constants
START_TOKEN = 1
UNKNOWN_TOKEN = 2
MAXLEN = 2697  # Could be loaded from config if dynamic

# Load encoded word dictionary
def loadEncoder():
    with open("encode_map", "rb") as handle:
        return pickle.load(handle)

# Clean individual review text
def cleanReview(review):
    return cleantext.clean(
        review,
        clean_all=False,
        extra_spaces=True,
        stopwords=True,
        lowercase=True,
        numbers=True,
        punct=True
    )

# Encode and pad input reviews
def encodeReview(reviews, save_map):
    encoded_reviews = []
    for review in reviews:
        review = cleanReview(review)
        encoded_review = [START_TOKEN] + [
            save_map.get(word, UNKNOWN_TOKEN) for word in review.split()
        ]
        encoded_reviews.append(encoded_review)
    
    padded = pad_sequences(encoded_reviews, maxlen=MAXLEN)
    return tf.convert_to_tensor(padded, dtype=tf.int32)

# Perform majority prediction using 3 models
def makePrediction(encoded_reviews, model1, model2, model3):
    rnn_pred = (model1.predict(encoded_reviews, verbose=0) > 0.5).astype(int)
    gru_pred = (model2.predict(encoded_reviews, verbose=0) > 0.5).astype(int)
    lstm_pred = (model3.predict(encoded_reviews, verbose=0) > 0.5).astype(int)

    final_pred = rnn_pred + gru_pred + lstm_pred
    return np.where(final_pred >= 2, "positive", "negative")

# For dataframe-based prediction
def predictOnDataFrame(df, review_column, model1, model2, model3, save_map):
    reviews = df[review_column].tolist()
    encoded_reviews = encodeReview(reviews, save_map)
    df['sentiment'] = makePrediction(encoded_reviews, model1, model2, model3)
    return df

# ---------- CLI for testing ----------
if __name__ == "__main__":
    save_map = loadEncoder()
    model1 = load_model("models/RNN.h5")
    model2 = load_model("models/GRU.h5")
    model3 = load_model("models/LSTM.h5")

    print("Enter review text (type -1 to exit):")
    while True:
        try:
            s = input(">> ").strip()
            if s == "-1":
                break
            if not s:
                print("Empty input. Try again.")
                continue
            encoded = encodeReview([s], save_map)
            sentiment = makePrediction(encoded, model1, model2, model3)[0]
            print("Sentiment:", sentiment)
        except Exception as e:
            print("Error during prediction:", str(e))
