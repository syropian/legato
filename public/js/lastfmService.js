(function() {
  angular.module('lastfmService', []).factory('Lastfm', function($http, $rootScope, LASTFM_API_KEY) {
    return {
      constructEndpoint: function(method) {
        return "http://ws.audioscrobbler.com/2.0/?method=" + method + "&user=" + $rootScope.user + "&api_key=" + LASTFM_API_KEY + "&format=json";
      },
      getRecentTracks: function() {
        var endpoint;
        endpoint = this.constructEndpoint("user.getrecenttracks");
        return $http.get(endpoint);
      }
    };
  });

}).call(this);
