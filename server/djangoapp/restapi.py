
import os
import requests
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv('backend_url', default='http://localhost:3030')
sentiment_analyzer_url = os.getenv('sentiment_analyzer_url', default='http://localhost:5000')


def get_request(endpoint, **kwargs):

    params = ""

    if (kwargs):
        for key, value in kwargs.items():
            params += key + "=" + value + "&"

    request_url = backend_url + endpoint + "?" + params

    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as e:
        print(e)


# POST request to insert a new review
def post_review(review_data):
    request_url = backend_url + "/insert_review"
    try:
        response = requests.post(request_url, json=review_data)
        print(review_data)
        return response.json()
    except Exception as e:
        print(e)


def analyze_review_sentiments(review):
    '''
    Returns the sentiment of the review
    '''
    request_url = sentiment_analyzer_url + "/analyze/" + review
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")
        return None
