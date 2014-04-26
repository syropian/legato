angular.module('lastfmService', []).factory('Lastfm', ($http, $rootScope, LASTFM_API_KEY) ->
  constructEndpoint: (method, opts) ->
    endpoint = "http://ws.audioscrobbler.com/2.0/?method=#{method}&user=#{$rootScope.user}&api_key=#{LASTFM_API_KEY}&format=json"
    if opts 
      endpoint += "&#{opts}"
    return endpoint

  getRecentTracks: ->
    endpoint = @constructEndpoint("user.getrecenttracks")
    $http.get(endpoint)
  getTopArtists: (period = "overall") ->
    endpoint = @constructEndpoint("user.gettopartists", "#{period}")
    $http.get(endpoint)
  getTopTracks: (period = "overall")   ->
    endpoint = @constructEndpoint("user.gettoptracks", "#{period}")
    $http.get(endpoint)
  getTopAlbums: (period = "overall")   ->
    endpoint = @constructEndpoint("user.gettopalbums", "#{period}")
    $http.get(endpoint)
)    