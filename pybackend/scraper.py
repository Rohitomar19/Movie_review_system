import requests
from bs4 import BeautifulSoup
import pandas as pd
from pymongo import MongoClient
import os

# ---------- Scrape Reviews from IMDb ----------
def scrapeReviews(soup, ImdbId):
    reviews = soup.find_all('div', {'class': 'imdb-user-review'})
    reviews_text = []

    for review in reviews:
        review_imdb = {}

        # Extract short review
        try:
            short_review = review.find('a', {'class': 'title'})
            review_imdb['short_review'] = short_review.string.strip()
        except:
            review_imdb['short_review'] = ""

        # Extract full review
        try:
            full_review = review.find('div', {'class': 'show-more__control'})
            review_imdb['full_review'] = full_review.string.strip()
        except:
            review_imdb['full_review'] = ""

        reviews_text.append(review_imdb)

    return {'ImdbId': ImdbId, 'reviews': reviews_text}

# ---------- Recursively Scrape Multiple Pages ----------
def scrap(movie_url, ImdbId, all_data, limit):
    if len(all_data) >= limit:
        return all_data[:limit]

    print(f"Scraping: {movie_url}")
    r = requests.get(movie_url, headers={'User-Agent': 'Mozilla/5.0'})
    soup = BeautifulSoup(r.text, 'html.parser')

    data = scrapeReviews(soup, ImdbId)
    all_data.extend(data['reviews'])

    if len(all_data) >= limit:
        return all_data[:limit]

    try:
        pagination_key = soup.find('div', {'class': 'load-more-data'})['data-key']
        next_url = f"https://www.imdb.com/title/{ImdbId}/reviews/_ajax?&paginationKey={pagination_key}"
        return scrap(next_url, ImdbId, all_data, limit)
    except Exception as e:
        print("No more pages or scraping done:", e)
        return all_data[:limit]

# ---------- Entry Point to Scrape IMDb and Store ----------
def start_scraping(ImdbId, limit):
    movie_url = f"https://www.imdb.com/title/{ImdbId}/reviews/_ajax?"
    all_data = scrap(movie_url, ImdbId, [], limit)
    return {
        'ImdbId': ImdbId,
        'reviews': all_data
    }

# ---------- Convert to DataFrame & Save ----------
def make_review(ImdbId, limit):
    data = start_scraping(ImdbId, limit)
    reviews = data['reviews']

    # Connect to MongoDB and store data
    client = MongoClient("mongodb://localhost:27017/")
    db = client["all_reviews"]
    collection = db["movies_reviews"]

    docs = [{"ImdbId": ImdbId, "reviews": review} for review in reviews]
    if docs:
        collection.insert_many(docs)

    # Create cleaned DataFrame
    df = pd.DataFrame(reviews)
    df["review"] = df["short_review"].fillna('') + " " + df["full_review"].fillna('')
    df.drop(columns=["short_review", "full_review"], inplace=True)

    # Optional: Save CSV for use in Streamlit
    save_path = f"tester_{ImdbId}.csv"
    df.to_csv(save_path, index=False)
    print(f"[✓] Saved to {save_path}")

    return df

# ---------- CLI test ----------
if __name__ == "__main__":
    imdb_id = "tt0468569"  # The Dark Knight
    df = make_review(imdb_id, 10)
    print(df.head())
