from django.urls import path, re_path
from rest_framework import permissions
from rest_framework_simplejwt import views as jwt_views

from .views import (UserSignUpView, UserLoginView,
                    AuthGameListView, AuthDemandPatternView,JoinGameView
                    )

from drf_yasg import openapi
from drf_yasg.views import get_schema_view

schema_view = get_schema_view(
    openapi.Info(
        title="Beer Game API",
        default_version='v1',
        description="This API allows us to authenticate users and play the Beer Game",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# State endpoints for REST API
urlpatterns = [
    path('signup/', UserSignUpView.as_view(), name='sign_up'),
    path('join-game/',JoinGameView.as_view(),name='join_game'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('games/', AuthGameListView.as_view(), name='games_list'),
    path('pattern/', AuthDemandPatternView.as_view(), name='demand_pattern'),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger',
                                         cache_timeout=0), name='schema-swagger-ui'),
]
