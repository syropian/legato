app = angular.module('app', 
  [
    'ngRoute',
    'mainCtrl',
    'lastfmService'
    ]
)
app.run ($rootScope) ->
  $rootScope.user = "hendo13"