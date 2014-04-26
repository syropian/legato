(function() {
  angular.module('mainCtrl', []).controller('MainController', function($scope, $http, Lastfm) {
    $scope.recentTracks = {};
    $scope.topArtists = [];
    Lastfm.getRecentTracks().success(function(res) {
      return $scope.recentTracks = res.recenttracks.track;
    });
    return Lastfm.getTopArtists().success(function(res) {
      return $scope.topArtists = res.topartists.artist.slice(0, 10);
    });
  });

}).call(this);