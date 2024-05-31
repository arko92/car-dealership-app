

import json
import logging
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth import logout
from django.contrib.auth.models import User

from .restapi import get_request, post_review, analyze_review_sentiments

from .models import CarMake, CarModel
from .populate import initiate

logger = logging.getLogger(__name__)


# View to handle login requests
@csrf_exempt
def login_user(request):
    # Parse the request body
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    # check if the provided login credentials can be authenticated
    user = authenticate(username=username, password=password)
    data = {"userName": username}
    if user is not None:
        # If user is valid, call login method to login current user
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(data)


# View to handle logout requests
@csrf_exempt
def logout_user(request):
    logout(request)
    data = {"userName": request.user.username}
    return JsonResponse(data)


# View to handle user registration requests
@csrf_exempt
def register_user(request):
    # Parse the request body
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']
    username_exists = False
    try:
        # Check if the username already exists
        User.objects.get(username=username)
        username_exists = True
    except Exception:
        logger.debug("{} is a new user".format(username))

    if not username_exists:
        # Create a new user with the provided credentials
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email
            )
        # Login the user and redirect the user to the list page
        login(request, user)
        data = {"userName": username, "status": "Registration successfull"}
        return JsonResponse(data)
    else:
        data = {"userName": username, "error": "User already registered"}
        return JsonResponse(data)


def get_cars(request):
    '''
    Returns a list of all cars models in the database
    '''

    # Get number of cars from the database
    # ToDo: Check if the use of filter() is redundant?
    count = CarMake.objects.filter().count()

    if (count == 0):
        '''
        If no cars are found, populate the CarMake and CarModel tables with
        some user data
        '''
        initiate()

    # Get all car models and the related car makes from the database
    car_models = CarModel.objects.select_related('car_make')
    # Create a list to store the car data
    cars = []

    for car_model in car_models:
        cars.append({
            'CarMake': car_model.car_make.name,
            'CarModel': car_model.name
        })
    # Return the list of cars as a JSON response
    return JsonResponse({"status": 200, 'CarModels': cars})


def get_dealerships(request, state="All"):
    '''
    Returns a list of all the dealerships in the database
    or the dealerships in a particular state
    '''
    # If "All" is selected from the dropdown, get all the dealerships
    # Else, get the dealerships in a particular state
    if state == "All":
        endpoint = "/fetchDealers"  # use this endpoint to get all the dealerships
    else:
        endpoint = "/fetchDealers/" + state  # use this endpoint to get dealerships in a particular state
    # Get all the dealerships from the database
    dealerships = get_request(endpoint)
    return JsonResponse({"status": 200, "dealers": dealerships})


def get_dealer_details(request, dealer_id):
    '''
    Returns the details of a particular dealer
    '''
    if (dealer_id):
        endpoint = "/fetchDealer/" + str(dealer_id)  # endpoint to get details of a particular dealer
        dealer_details = get_request(endpoint)
        return JsonResponse({"status": 200, "dealer": dealer_details})
    else:
        return JsonResponse({"status": 400, "error": "Invalid dealer id"})

@csrf_exempt
def get_dealer_reviews(request, dealer_id):
    '''
    Returns the reviews for a particular dealer
    '''
    if (dealer_id):
        endpoint = "/fetchReviews/dealer/" + str(dealer_id)  # endpoint to get reviews for a particular dealer
        reviews = get_request(endpoint)  # get reviews from the database
        print("Fetched reviews:", reviews)  # Debug log to check the fetched reviews
        for review_detail in reviews:
            response = analyze_review_sentiments(review_detail['review'])
            print(json.dumps(response["sentiment"]))
            # review_detail.update({"sentiment": response["sentiment"]})

            review_detail["sentiment"] = response["sentiment"]
        print('Updated reviews', reviews)
        return JsonResponse({"status": 200, "reviews": reviews})
    else:
        return JsonResponse({"status": 400, "error": "Invalid dealer id"})


@csrf_exempt
def add_review(request):
    '''
    Adds a review for a particular dealer
    '''
    if not request.user.is_anonymous:
        review_data = json.loads(request.body)
        try:
            post_review(review_data)
            return JsonResponse({"status": 200, "message": "Review added successfully"})
        except Exception:
            return JsonResponse({"status": 403, "message": "Unauthorized"})
        

@csrf_exempt
def get_sentiment(request, review):
    '''
    Returns the sentiment of a review
    '''
    if (review):
        sentiment = get_sentiment(review)
        return JsonResponse({"status": 200, "sentiment": sentiment})