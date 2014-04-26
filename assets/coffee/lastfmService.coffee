angular.module('lastfmService', []).factory('Lastfm', ($http, $rootScope, LASTFM_API_KEY) ->
  constructEndpoint: (method) ->
    return "http://ws.audioscrobbler.com/2.0/?method=#{method}&user=#{$rootScope.user}&api_key=#{LASTFM_API_KEY}&format=json"

  getRecentTracks: ->
    endpoint = @constructEndpoint("user.getrecenttracks")
    $http.get(endpoint)
)    