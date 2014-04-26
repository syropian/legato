angular.module('mainCtrl', []).controller('MainController', ($scope, $http, Lastfm) ->
  $scope.recentTracks = {}
  $scope.topArtists = []
  Lastfm.getRecentTracks().success((res)->
    window.trax = res.recenttracks.track
    $scope.recentTracks = res.recenttracks.track
  )
  Lastfm.getTopArtists().success((res)->
    $scope.topArtists = res.topartists.artist.slice(0,5)
  )
)  