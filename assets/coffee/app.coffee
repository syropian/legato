# $('.container').masonry(
#   columnWidth: 380
#   itemSelector: ".statbox"
#   isFitWidth: true
#   gutter: 15
# )

app = angular.module('app', 
  [
    'ngRoute',
    'wu.masonry',
    'mainCtrl',
    'lastfmService'
    ]
)

app.config ($routeProvider, $locationProvider) ->
  $locationProvider.html5Mode(true)
  $routeProvider.when('/', {
    templateUrl: 'public/templates/index.html'
    controller: 'MainController'
  }).when('/:user', {
    templateUrl: 'public/templates/index.html'
    controller: 'MainController'
  })  
  $routeProvider.otherwise({ redirectTo: '/' })

app.directive('barchart', ->
  restrict: 'E'
  template: '<div class="barchart"></div>'
  replace: true
  link: ($scope, element, attrs) ->
    $scope.$watch(attrs.data, (newVal) ->
      if newVal.length
        unless element.children('svg').length
          createGraph()
        else
          element.data('morris').setData(newVal)
        $('.container').masonry()
    )
    createGraph = ->
      data = $scope[attrs.data]
      xkey = attrs.xkey
      ykeys = [ attrs.ykeys ]
      labels = [ attrs.labels ]
      
      chart = Morris.Bar(
        element: element
        data: data
        xkey: xkey
        ykeys: ykeys
        labels: labels
        gridTextSize: 11
        barColors: ["#2dbba6"]
        hoverCallback: (index, options, content, row) ->
          if row.artist
            return content.replace(row.name, "<strong>#{row.name}</strong> <em>by</em> #{row.artist.name}")
          else
            return content
      )
      $(element).data('morris', chart)
    
)

app.run ($rootScope, $location) ->
  $rootScope.user = window.location.pathname.replace('/', '') || "rj"  