from rest_framework import viewsets, permissions, generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event
from .serializers import EventSerializer, EventRegistrationSerializer
from .permissions import IsOrganizerOrReadOnly
from django.core.mail import send_mail


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('date')
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOrganizerOrReadOnly]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter,
                       filters.OrderingFilter]
    filterset_fields = ['date', 'location', 'author']
    search_fields = ['title', 'description']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class EventRegistrationCreateView(generics.CreateAPIView):
    serializer_class = EventRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        registration = serializer.save(user=self.request.user)

        send_mail(
            subject="You have been registered to this event!",
            message=(
                f'You registered to this {registration.event.title} event\n'
                f'Data is {registration.event.date}\n'
                f'Place is {registration.event.location}\n'
            ),
            from_email=None,
            recipient_list=[self.request.user.email],
            fail_silently=False
        )
