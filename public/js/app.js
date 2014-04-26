(function() {
  var app;

  app = angular.module('app', ['ngRoute', 'mainCtrl', 'lastfmService']);

  app.run(function($rootScope) {
    return $rootScope.user = "hendo13";
  });

}).call(this);
