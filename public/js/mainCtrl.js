(function() {
  angular.module('mainCtrl', []).controller('MainController', function($scope, $http, Lastfm) {
    $scope.recentTracks = {};
    return Lastfm.getRecentTracks().success(function(res) {
      return $scope.recentTracks = res.recenttracks.track;
    });
  });

}).call(this);
