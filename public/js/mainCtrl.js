(function() {
  angular.module('mainCtrl', []).controller('MainController', function($scope, $rootScope, $http, $location, $routeParams, Lastfm) {
    $scope.recentTracks = {};
    $scope.topArtists = [];
    $scope.topTracks = [];
    $scope.topAlbums = [];
    $scope.topTracksLoading = false;
    $scope.topArtistsLoading = false;
    $scope.topAlbumsLoading = false;
    if ($routeParams.user) {
      $rootScope.user = $routeParams.user;
    } else {
      $rootScope.user = "rj";
    }
    $scope.user = $rootScope.user;
    $scope.loading = true;
    $scope.getTopTracks = function(filter, event) {
      if (filter == null) {
        filter = "overall";
      }
      if (event == null) {
        event = null;
      }
      $scope.topTracksLoading = true;
      if (event) {
        $(event.currentTarget).addClass('active').siblings().removeClass('active');
      }
      return Lastfm.getTopTracks(filter).success(function(res) {
        $scope.topTracks = res.toptracks.track.slice(0, 10);
        return $scope.topTracksLoading = false;
      });
    };
    $scope.getTopArtists = function(filter, event) {
      if (filter == null) {
        filter = "overall";
      }
      $scope.topArtistsLoading = true;
      if (event) {
        $(event.currentTarget).addClass('active').siblings().removeClass('active');
      }
      return Lastfm.getTopArtists(filter).success(function(res) {
        $scope.topArtists = res.topartists.artist.slice(0, 10);
        return $scope.topArtistsLoading = false;
      });
    };
    $scope.getTopAlbums = function(filter, event) {
      if (filter == null) {
        filter = "overall";
      }
      $scope.topAlbumsLoading = true;
      if (event) {
        $(event.currentTarget).addClass('active').siblings().removeClass('active');
      }
      return Lastfm.getTopAlbums(filter).success(function(res) {
        $scope.topAlbums = res.topalbums.album.slice(0, 10);
        return $scope.topAlbumsLoading = false;
      });
    };
    $scope.getData = function() {
      return $.when(Lastfm.getRecentTracks().success(function(res) {
        return $scope.recentTracks = res.recenttracks.track;
      }), $scope.getTopTracks(), $scope.getTopArtists(), $scope.getTopAlbums()).then(function() {
        $('.container').masonry();
        return $scope.loading = false;
      });
    };
    $scope.updateUser = function() {
      $rootScope.user = $scope.user;
      $location.path("" + $scope.user);
      return $scope.getData();
    };
    return $scope.getData();
  });

}).call(this);
