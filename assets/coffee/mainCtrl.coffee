angular.module('mainCtrl', []).controller('MainController', ($scope, $http, Lastfm) ->
  $scope.recentTracks = {}
  Lastfm.getRecentTracks().success((res)->
    #console.log res.recenttracks.track[0].name
    $scope.recentTracks = res.recenttracks.track
  )
)  