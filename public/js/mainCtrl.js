(function() {
  angular.module('mainCtrl', []).controller('MainController', function($scope, $rootScope, $http, Lastfm) {
    $scope.recentTracks = {};
    $scope.topArtists = [];
    $scope.topTracks = [];
    $scope.topAlbums = [];
    $scope.user = $rootScope.user;
    $scope.loading = true;
    $scope.getData = function() {
      return $.when(Lastfm.getRecentTracks().success(function(res) {
        return $scope.recentTracks = res.recenttracks.track;
      }), Lastfm.getTopArtists().success(function(res) {
        return $scope.topArtists = res.topartists.artist.slice(0, 10);
      }), Lastfm.getTopTracks().success(function(res) {
        return $scope.topTracks = res.toptracks.track.slice(0, 10);
      }), Lastfm.getTopAlbums().success(function(res) {
        return $scope.topAlbums = res.topalbums.album.slice(0, 10);
      })).then(function() {
        $('.container').masonry();
        return $scope.loading = false;
      });
    };
    $scope.updateUser = function() {
      $rootScope.user = $scope.user;
      return $scope.getData();
    };
    return $scope.getData();
  });

}).call(this);
