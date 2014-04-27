angular.module('lastfmService', []).factory('Lastfm', ($http, $rootScope, LASTFM_API_KEY) ->
  constructEndpoint: (method, opts) ->
    endpoint = "http://ws.audioscrobbler.com/2.0/?method=#{method}&user=#{$rootScope.user}&api_key=#{LASTFM_API_KEY}&format=json"
    if opts 
      endpoint += "&#{opts}"
    return endpoint

  getRecentTracks: ->
    endpoint = @constructEndpoint("user.getrecenttracks")
    $http.get(endpoint)
  getTopArtists: (filter) ->
    endpoint = @constructEndpoint("user.gettopartists", "period=#{filter}")
    $http.get(endpoint)
  getTopTracks: (filter) ->
    endpoint = @constructEndpoint("user.gettoptracks", "period=#{filter}")
    $http.get(endpoint)
  getTopAlbums: (filter) ->
    endpoint = @constructEndpoint("user.gettopalbums", "period=#{filter}")
    $http.get(endpoint)
)    