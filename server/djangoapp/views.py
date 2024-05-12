

import json
import logging
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth import logout
from django.contrib.auth.models import User

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
