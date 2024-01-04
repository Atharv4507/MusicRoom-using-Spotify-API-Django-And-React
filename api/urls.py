from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoom, LeaveRoom, UpdateRoom
from .views import AuthURL, spotify_callback, IsAuthenticated, CurrentSong, PlaySong, PauseSong, SkipSong, SeekSong, PrevSong, PlayList

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateRoom.as_view()),
    path("get-auth-url", AuthURL.as_view()),
    path("redirect", spotify_callback),
    path("is-authenticated", IsAuthenticated.as_view()),
    path('current-song', CurrentSong.as_view()),
    path('pause', PauseSong.as_view()), 
    path('play', PlaySong.as_view()),
    path('skip', SkipSong.as_view()),
    path('seek', SeekSong.as_view()),
    path('prev', PrevSong.as_view()),
    path('recent', PlayList.as_view()),
    
]
