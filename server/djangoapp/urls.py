from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings


app_name = "djangoapp"
urlpatterns = [
    path(route='login', view=views.login_user, name='login'),
    path(route='logout', view=views.logout_user, name='logout'),
    path(route='register', view=views.register_user, name='register'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
