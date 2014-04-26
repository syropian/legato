angular.module('mainCtrl', []).controller('MainController', ($scope, $http, Lastfm) ->
  $scope.recentTracks = {}
  $scope.topArtists = []
  Lastfm.getRecentTracks().success((res)->
    $scope.recentTracks = res.recenttracks.track
  )
  Lastfm.getTopArtists().success((res)->
    artists = res.topartists.artist.slice(0,10)
    artists.forEach((artist) ->
      $scope.topArtists.push(
        "name": artist.name
        "playcount": artist.playcount
      )
    )
  )
)  