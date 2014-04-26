angular.module('mainCtrl', []).controller('MainController', ($scope, $rootScope, $http, Lastfm) ->
  $scope.recentTracks = {}
  $scope.topArtists = []
  $scope.topTracks = []
  $scope.topAlbums = []
  $scope.user = $rootScope.user
  $scope.loading = true
  $scope.getData = ->
    $.when(
      Lastfm.getRecentTracks().success((res) ->
        $scope.recentTracks = res.recenttracks.track
      ),
      Lastfm.getTopArtists().success((res) ->
        $scope.topArtists = res.topartists.artist.slice(0,10)
      ),
      Lastfm.getTopTracks().success((res) ->
        $scope.topTracks = res.toptracks.track.slice(0,10)
      ),
      Lastfm.getTopAlbums().success((res) ->
        $scope.topAlbums = res.topalbums.album.slice(0,10)
      )
    ).then(->
      $('.container').masonry()
      $scope.loading = false
    )
    
    
  $scope.updateUser = ->
    $rootScope.user = $scope.user
    $scope.getData()
  
  $scope.getData()  
)  