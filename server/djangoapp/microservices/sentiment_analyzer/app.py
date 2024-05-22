import json
from flask import Flask
from nltk.sentiment import SentimentIntensityAnalyzer
app = Flask("Sentiment Analyzer")

sia = SentimentIntensityAnalyzer()


@app.route("/", methods=["GET"])
def home():
    return "Welcome to the Sentiment Analyzer. \
    Use /analyze/text to get the sentiment"

# Analyze the text and return the sentiment
@app.route("/analyze/<input_text>", methods=["GET"])
def analyze_text(input_text):
    scores = sia.polarity_scores(input_text)
    print(scores)
    pos = float(scores['pos'])
    neg = float(scores['neg'])
    neu = float(scores['neu'])
    res = "positive"
    if (neg > pos and neg > neu):
        res = "negative"
    elif (neu > neg and neu > pos):
        res = "neutral"
    res = json.dumps({"sentiment": res})
    return res


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=3000)
