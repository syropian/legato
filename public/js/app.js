(function() {
  var app;

  app = angular.module('app', ['ngRoute', 'mainCtrl', 'lastfmService']);

  app.directive('barchart', function() {
    return {
      restrict: 'E',
      template: '<div class="barchart"></div>',
      replace: true,
      link: function($scope, elem, attrs) {
        var data, labels, xkey, ykeys;
        console.log($scope);
        data = $scope["" + attrs.data];
        xkey = "name";
        ykeys = ["playcount"];
        labels = ["Play Count"];
        return Morris.Bar({
          element: elem,
          data: data,
          xkey: xkey,
          ykeys: ykeys,
          labels: labels
        });
      }
    };
  });

  app.run(function($rootScope) {
    $rootScope.user = "hendo13";
    return $rootScope.loading = false;
  });

}).call(this);
