(function() {
  angular.module('mainCtrl', []).controller('MainController', function($scope, $http, Lastfm) {
    $scope.recentTracks = {};
    $scope.topArtists = [];
    $scope.topTracks = [];
    $scope.topAlbums = [];
    $scope.loading = true;
    Lastfm.getRecentTracks().success(function(res) {
      $scope.recentTracks = res.recenttracks.track;
      return $('.container').masonry();
    });
    Lastfm.getTopArtists().success(function(res) {
      return $scope.topArtists = res.topartists.artist.slice(0, 10);
    });
    Lastfm.getTopTracks().success(function(res) {
      return $scope.topTracks = res.toptracks.track.slice(0, 10);
    });
    return Lastfm.getTopAlbums().success(function(res) {
      $scope.topAlbums = res.topalbums.album.slice(0, 10);
      return $scope.loading = false;
    });
  });

}).call(this);
