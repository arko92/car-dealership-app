from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings


app_name = "djangoapp"

urlpatterns = [
    path(route='login', view=views.login_user, name='login'), 
    path(route='logout', view=views.logout_user, name='logout'), 
    path(route='register', view=views.register_user, name='register'),  
    path(route='get_cars', view=views.get_cars, name='getcars'),
    path(route='get_dealers', view=views.get_dealerships, name='get_dealers'),
    path(route='get_dealers/<str:state>', view=views.get_dealerships,
         name='get_dealers_by_state'),
    path(route='dealer/<int:dealer_id>', view=views.get_dealer_details,
         name='dealer_details')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
