
app = angular.module('app', 
  [
    'ngRoute',
    'mainCtrl',
    'lastfmService'
    ]
)

app.directive('barchart', ->
  restrict: 'E'
  template: '<div class="barchart"></div>'
  replace: true
  link: ($scope, element, attrs) ->
    $scope.$watch(attrs.data, (newVal) ->
      if newVal.length
        createGraph()
    )
    createGraph = ->
      data = $scope[attrs.data]
      xkey = attrs.xkey
      ykeys = [ attrs.ykeys ]
      labels = [ attrs.labels ]
      
      Morris.Bar(
        element: element
        data: data
        xkey: xkey
        ykeys: ykeys
        labels: labels
        gridTextSize: 11
        barColors: ["#2dbba6"]
      )
    
)

app.run ($rootScope) ->
  $rootScope.user = "hendo13"
  $rootScope.loading = false