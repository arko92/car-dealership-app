import os
import json
from flask import Flask, request, jsonify
from nltk.sentiment import SentimentIntensityAnalyzer

app = Flask(__name__)

sia = SentimentIntensityAnalyzer()


@app.route("/", methods=["GET"])
def home():
    return "Welcome to the Sentiment Analyzer. Use /analyze/<text> to get the sentiment"


@app.route("/analyze/<input_text>", methods=["GET"])
def analyze_text(input_text):
    scores = sia.polarity_scores(input_text)
    pos = float(scores['pos'])
    neg = float(scores['neg'])
    neu = float(scores['neu'])
    res = "positive"
    if neg > pos and neg > neu:
        res = "negative"
    elif neu > neg and neu > pos:
        res = "neutral"
    res = jsonify({"sentiment": res})
    return res


def lambda_handler(event, context):
    # Extract the necessary information from the event, providing defaults if keys are missing
    path = event.get('path', '/')
    http_method = event.get('httpMethod', 'GET')
    headers = event.get('headers', {})
    query_string_parameters = event.get('queryStringParameters', '')

    with app.test_request_context(
        path=path,
        base_url='https://' + headers.get('Host', 'localhost'),
        query_string=query_string_parameters,
        method=http_method,
        headers=headers
    ):
        response = app.full_dispatch_request()
        return {
            'statusCode': response.status_code,
            'headers': dict(response.headers),
            'body': response.get_data(as_text=True)
        }
