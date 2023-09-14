from django.contrib import admin
from .models import User, Instructor, Player, Game, DemandPattern

# Register models for the Admin to perform CRUD operations on
admin.site.register(User)
admin.site.register(Instructor)
admin.site.register(Player)
admin.site.register(Game)
admin.site.register(DemandPattern)
