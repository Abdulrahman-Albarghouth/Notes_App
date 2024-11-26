from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from notes_app.views import NoteViewSet
from notes_app.views import UserRegistrationView
from notes_app.views import UserProfileView
from notes_app.views import ChangePasswordView
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register(r'notes', NoteViewSet, basename='note')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', UserRegistrationView.as_view(), name='user_registration'),
    path('api/profile/', UserProfileView.as_view(), name='profile'),
    path('api/change-password/', ChangePasswordView.as_view(), name='change-password'),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
