from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, EventRegistrationCreateView

router = DefaultRouter()
router.register(r'events', EventViewSet, )

urlpatterns = [
    path('', include(router.urls)),
    path('register_event/', EventRegistrationCreateView.as_view(),
         name="event-register")
]
