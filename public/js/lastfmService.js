(function() {
  angular.module('lastfmService', []).factory('Lastfm', function($http, $rootScope, LASTFM_API_KEY) {
    return {
      constructEndpoint: function(method, opts) {
        var endpoint;
        endpoint = "http://ws.audioscrobbler.com/2.0/?method=" + method + "&user=" + $rootScope.user + "&api_key=" + LASTFM_API_KEY + "&format=json";
        if (opts) {
          endpoint += "&" + opts;
        }
        return endpoint;
      },
      getRecentTracks: function() {
        var endpoint;
        endpoint = this.constructEndpoint("user.getrecenttracks");
        return $http.get(endpoint);
      },
      getTopArtists: function(filter) {
        var endpoint;
        endpoint = this.constructEndpoint("user.gettopartists", "period=" + filter);
        return $http.get(endpoint);
      },
      getTopTracks: function(filter) {
        var endpoint;
        endpoint = this.constructEndpoint("user.gettoptracks", "period=" + filter);
        return $http.get(endpoint);
      },
      getTopAlbums: function(filter) {
        var endpoint;
        endpoint = this.constructEndpoint("user.gettopalbums", "period=" + filter);
        return $http.get(endpoint);
      }
    };
  });

}).call(this);
