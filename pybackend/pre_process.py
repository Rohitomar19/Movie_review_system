import pandas as pd
from scraper import start  # Assumes this fetches reviews and saves JSON

def make_review(ImdbId, limit):
    # Start scraping and saving JSON file
    start(ImdbId=ImdbId, limit=limit)
    
    # Load the saved JSON
    try:
        df = pd.read_json(f"./reviews/reviews_{ImdbId}.json")
    except FileNotFoundError:
        print(f"❌ JSON file for IMDb ID '{ImdbId}' not found.")
        return pd.DataFrame()

    # Combine short + full reviews
    def combine_reviews(row):
        short = row['reviews'].get('short_review', '')
        full = row['reviews'].get('full_review', '')
        return f"{short} {full}".strip()

    df['review'] = df['reviews'].apply(combine_reviews)

    # Drop unnecessary columns
    if 'ImdbId' in df.columns:
        df.drop(columns=['ImdbId'], inplace=True)
    df.drop(columns=['reviews'], inplace=True)

    # Save as CSV
    output_path = f"tester_{ImdbId}.csv"
    df.to_csv(output_path, index=False)
    print(f"✅ Saved {len(df)} reviews to {output_path}")

    return df
