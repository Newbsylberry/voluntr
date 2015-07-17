angular.module('voluntrApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, searchService,$window,
                                      $mdSidenav, $http, $stateParams, $timeout) {


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


    var resultsFormat = function(raw_result) {
      var base_result = raw_result._source
      var result = {}
      if (raw_result._type == "organization_person" &&
        base_result.person &&
        base_result.person.first_name && base_result.person.first_name ) {
        result.id = base_result.person_id
        result.type = "person";
        result.title = base_result.person.first_name + " " + base_result.person.last_name;
      } else if (raw_result._type == "opportunity") {
        result.id = base_result.id;
        result.type = "opportunity";
        result.title = base_result.name;
      }
      $scope.results.push(result)
    };

    $scope.search = function() {
      $scope.results = [];
      $http({
        url: 'api/v1/organizations/' + $stateParams.organization_Id + '/search',
        params: {query: $scope.search_query}
      }).
        success(function(data, status, headers, config) {
          console.log(data)
          angular.forEach(data, resultsFormat)
        }).
        error(function(data, status, headers, config) {
          console.log(data)
        });
  }

$scope.close = function () {
  $mdSidenav('left').close()
    .then(function () {
      $scope.menu_open = false;
    });
};


});
