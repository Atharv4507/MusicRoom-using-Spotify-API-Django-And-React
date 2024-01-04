from django.contrib import admin
from .models import Room, CreateRoom, SpotifyToken

admin.site.register(Room)
admin.site.register(CreateRoom)
# from .util import update_or_create_user_token, refresh_spotify_token
admin.site.register(SpotifyToken)
