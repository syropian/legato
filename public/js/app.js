(function() {
  var app;

  app = angular.module('app', ['ngRoute', 'wu.masonry', 'mainCtrl', 'lastfmService']);

  app.directive('barchart', function() {
    return {
      restrict: 'E',
      template: '<div class="barchart"></div>',
      replace: true,
      link: function($scope, element, attrs) {
        var createGraph;
        $scope.$watch(attrs.data, function(newVal) {
          if (newVal.length) {
            createGraph();
            return $('.container').masonry();
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
            labels: labels,
            gridTextSize: 11,
            barColors: ["#2dbba6"],
            hoverCallback: function(index, options, content, row) {
              if (row.artist) {
                return content.replace(row.name, "<strong>" + row.name + "</strong> <em>by</em> " + row.artist.name);
              } else {
                return content;
              }
            }
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
