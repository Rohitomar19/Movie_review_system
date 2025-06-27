import streamlit as st
import pandas as pd
from predictor import loadEncoder, encodeReview, makePrediction, cleanReview
from pre_process import make_review
from keras.models import load_model

# ---------- Style Containers for Colored Reviews ----------
def create_container_with_color(id, color="#E4F2EC"):
    plh = st.container()
    html_code = """<div id='my_div_outer'></div>"""
    st.markdown(html_code, unsafe_allow_html=True)

    with plh:
        inner_html_code = f"<div id='my_div_inner_{id}'></div>"
        plh.markdown(inner_html_code, unsafe_allow_html=True)

    chat_plh_style = f"""
        <style>
            div[data-testid='stVerticalBlock']:has(div#my_div_inner_{id}):not(:has(div#my_div_outer)) {{
                background: {color};
                border-radius: 10px;
                padding: 4px;
            }}
        </style>
    """
    st.markdown(chat_plh_style, unsafe_allow_html=True)
    return plh

# ---------- Caching Resources ----------
@st.cache_resource
def load_models():
    model1 = load_model("models/RNN.h5")
    model2 = load_model("models/GRU.h5")
    model3 = load_model("models/LSTM.h5")
    return model1, model2, model3

@st.cache_resource
def load_dictionary():
    return loadEncoder()

@st.cache_data
def read_csv(path):
    df = pd.read_csv(path)
    if "sentiment" not in df.columns:
        df.insert(1, "sentiment", value=None)
    return df

# ---------- Initialize Session State ----------
if 'df' not in st.session_state:
    st.session_state['df'] = read_csv("tester.csv")

if 'movie_id' not in st.session_state:
    st.session_state['movie_id'] = ''

dictionary = load_dictionary()
model1, model2, model3 = load_models()

# ---------- Sidebar ----------
st.sidebar.header("Options")
option = st.sidebar.radio("Choose", ["Dataset Sentiment Analysis", "Comment Sentiment Analysis", "Download"])

# ---------- Comment Sentiment Analysis ----------
if option == "Comment Sentiment Analysis":
    st.header("Single Comment Sentiment")
    review = st.text_input("Enter a Comment")
    if st.button("Analyse"):
        if review.strip() == '':
            st.warning("Please enter a comment to analyze.")
        else:
            encoded = encodeReview([review], dictionary)
            result = makePrediction(encoded, model1, model2, model3)[0]
            st.success(f"The comment is **{result.upper()}**")

# ---------- Dataset Sentiment Analysis ----------
elif option == "Dataset Sentiment Analysis":
    st.header("Sentiment of Comments for a Movie")
    movie = st.text_input("Enter the IMDB ID (e.g., tt0468569)")
    num_review = st.slider("Number of reviews", 10, 50, 10, 1)

    if st.button("Give analysis"):
        make_review(movie, num_review)  # This fetches and saves the data
        df = read_csv(f"tester_{movie}.csv")
        st.session_state['df'] = df
        st.session_state['movie_id'] = movie

    df = st.session_state['df']

    for row in range(min(num_review, len(df))):
        if pd.isna(df.loc[row, 'sentiment']):
            review_text = df.loc[row, 'review']
            encoded = encodeReview([review_text], dictionary)
            result = makePrediction(encoded, model1, model2, model3)[0]
            df.loc[row, 'sentiment'] = result
            st.session_state['df'] = df

        sentiment = df.loc[row, 'sentiment']
        bg_color = "rgba(0, 200, 0, 0.5)" if sentiment == "positive" else "rgba(200, 0, 0, 0.5)"
        container = create_container_with_color(row, color=bg_color)

        with container:
            st.markdown(cleanReview(df.loc[row, 'review']))
            col1, col2 = st.columns(2)
            with col1:
                if st.button("Positive", key=f"pos-{row}"):
                    df.loc[row, "sentiment"] = "positive"
            with col2:
                if st.button("Negative", key=f"neg-{row}"):
                    df.loc[row, "sentiment"] = "negative"

# ---------- Download Tab ----------
elif option == "Download":
    st.header("Download Your Processed Dataset")
    df = st.session_state['df']
    st.write(df)

    st.download_button(
        label="Download CSV",
        data=df.to_csv(index=False),
        file_name=f"sentiment_results_{st.session_state.get('movie_id', 'output')}.csv",
        mime="text/csv"
    )
