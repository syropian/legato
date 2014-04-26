angular.module('mainCtrl', []).controller('MainController', ($scope, $http, Lastfm) ->
  $scope.recentTracks = {}
  $scope.topArtists = []
  $scope.topTracks = []
  $scope.topAlbums = []
  $scope.loading = true
  Lastfm.getRecentTracks().success((res)->
    $scope.recentTracks = res.recenttracks.track
    $('.container').masonry()
  )
  Lastfm.getTopArtists().success((res)->
    $scope.topArtists = res.topartists.artist.slice(0,10)
  )
  Lastfm.getTopTracks().success((res)->
    $scope.topTracks = res.toptracks.track.slice(0,10)
  )
  Lastfm.getTopAlbums().success((res)->
    $scope.topAlbums = res.topalbums.album.slice(0,10)
    $scope.loading = false
  )

)  