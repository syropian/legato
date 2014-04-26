(function() {
  var app;

  app = angular.module('app', ['ngRoute', 'mainCtrl', 'lastfmService']);

  app.directive('barchart', function() {
    return {
      restrict: 'E',
      template: '<div class="barchart"></div>',
      replace: true,
      link: function($scope, element, attrs) {
        var createGraph;
        $scope.$watch('topArtists', function(newVal) {
          if (newVal.length) {
            return createGraph();
          }
        });
        return createGraph = function() {
          var data, labels, xkey, ykeys;
          data = $scope[attrs.data];
          xkey = attrs.xkey;
          ykeys = [attrs.ykeys];
          labels = [attrs.labels];
          return Morris.Bar({
            element: element,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            labels: labels
          });
        };
      }
    };
  });

  app.run(function($rootScope) {
    $rootScope.user = "hendo13";
    return $rootScope.loading = false;
  });

}).call(this);
