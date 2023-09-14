from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Utilize Admin site
    path('admin/', admin.site.urls),
    path('api/', include('beer.urls'))
]
