angular.module('voluntrApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, searchService,$window, $mdSidenav) {


    $scope.search_filter = searchService.search;


    $scope.open = function() {
      $mdSidenav('left').open()
        .then(function () {
          $scope.menu_open = true;
          console.log($scope.menu_open)
        });
    }

    $scope.$watch('search_query', function () {
      if ($scope.search_query) {
        console.log($scope.searching)
        $scope.searching = true;
      } else if (!$scope.search_query) {
        $scope.searching = false;
        console.log($scope.searching)
      }
    });

    $scope.search = function() {

    }

    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $scope.menu_open = false;
        });
    };


  });
