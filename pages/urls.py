from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from pages import views


app_name = 'pages'

urlpatterns = [
    path('', views.home_page, name='home'),

    # prpcess ajax request
    path('contact/', views.contact_view, name='contact'),
]



