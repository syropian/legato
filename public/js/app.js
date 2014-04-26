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
            if (!element.children('svg').length) {
              createGraph();
            } else {
              element.data('morris').setData(newVal);
            }
            return $('.container').masonry();
          }
        });
        return createGraph = function() {
          var chart, data, labels, xkey, ykeys;
          data = $scope[attrs.data];
          xkey = attrs.xkey;
          ykeys = [attrs.ykeys];
          labels = [attrs.labels];
          chart = Morris.Bar({
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
          return $(element).data('morris', chart);
        };
      }
    };
  });

  app.run(function($rootScope, $location) {
    return $rootScope.user = window.location.pathname.replace('/', '') || "rj";
  });

}).call(this);
