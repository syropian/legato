(function() {
  angular.module('mainCtrl', []).controller('MainController', function($scope, $http, Lastfm) {
    $scope.recentTracks = {};
    $scope.topArtists = [];
    Lastfm.getRecentTracks().success(function(res) {
      return $scope.recentTracks = res.recenttracks.track;
    });
    return Lastfm.getTopArtists().success(function(res) {
      var artists;
      artists = res.topartists.artist.slice(0, 10);
      return artists.forEach(function(artist) {
        return $scope.topArtists.push({
          "name": artist.name,
          "playcount": artist.playcount
        });
      });
    });
  });

}).call(this);
