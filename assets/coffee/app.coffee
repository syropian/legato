
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
  link: ($scope, elem, attrs) ->
    console.log $scope
    data = $scope["#{attrs.data}"]
    xkey = "name"
    ykeys = ["playcount"]
    labels = ["Play Count"]
    Morris.Bar(
      element: elem
      data: data
      xkey: xkey
      ykeys: ykeys
      labels: labels
    )
)

app.run ($rootScope) ->
  $rootScope.user = "hendo13"
  $rootScope.loading = false