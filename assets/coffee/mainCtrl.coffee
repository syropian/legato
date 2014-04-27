angular.module('mainCtrl', []).controller('MainController', ($scope, $rootScope, $http, $location, $routeParams, Lastfm) ->
  $scope.recentTracks = {}
  $scope.topArtists = []
  $scope.topTracks = []
  $scope.topAlbums = []
  $scope.topTracksLoading = false
  $scope.topArtistsLoading = false
  $scope.topAlbumsLoading = false
  if $routeParams.user
    $rootScope.user = $routeParams.user
  else
    $rootScope.user = "rj"  
  
  $scope.user = $rootScope.user
  $scope.loading = true
  
  $scope.getTopTracks = (filter = "overall", event = null) ->
    $scope.topTracksLoading = true
    if event
      $(event.currentTarget).addClass('active').siblings().removeClass('active')
    Lastfm.getTopTracks(filter).success((res) ->
      $scope.topTracks = res.toptracks.track.slice(0,10)
      $scope.topTracksLoading = false
    )

  $scope.getTopArtists = (filter = "overall", event) ->
    $scope.topArtistsLoading = true
    if event
      $(event.currentTarget).addClass('active').siblings().removeClass('active')
    Lastfm.getTopArtists(filter).success((res) ->
      $scope.topArtists = res.topartists.artist.slice(0,10)
      $scope.topArtistsLoading = false
    )
    
  $scope.getTopAlbums = (filter = "overall", event) ->
    $scope.topAlbumsLoading = true
    if event
      $(event.currentTarget).addClass('active').siblings().removeClass('active')
    Lastfm.getTopAlbums(filter).success((res) ->
      $scope.topAlbums = res.topalbums.album.slice(0,10)
      $scope.topAlbumsLoading = false
    )

  $scope.getData = ->
    $.when(
      Lastfm.getRecentTracks().success((res) ->
        $scope.recentTracks = res.recenttracks.track
      ),
      $scope.getTopTracks(),
      $scope.getTopArtists(),
      $scope.getTopAlbums()
    ).then(->
      $('.container').masonry()
      $scope.loading = false
    )
    
    
  $scope.updateUser = ->
    $rootScope.user = $scope.user
    $location.path("#{$scope.user}")
    $scope.getData()
  
  $scope.getData()  
)  