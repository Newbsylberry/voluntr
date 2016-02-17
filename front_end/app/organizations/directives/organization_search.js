angular.module('voluntrApp').directive("organizationSearch", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/organization_search.html',
    scope: {
      organization: "=",
      selectedOrganizations: "="
    },
    restrict: 'E',
    controller: function ($scope, $http) {
      var resultsFormat = function(raw_result) {
        var base_result = raw_result._source
        var result = {}
        console.log(raw_result)
          result.id = base_result.id;
          result.name = base_result.name;
          result.city = base_result.city;
          result.state = base_result.state;
        $scope.organizations.push(result)
        console.log($scope.organizations)
      };

      $scope.addOrganization = function(organization){
        $scope.selectedOrganizations.push(organization)
        $scope.search_query = '';
      };

      $scope.$watch('search_query', function () {
        $scope.loaded = false;
        $scope.organizations = [];
        if ($scope.search_query && !$scope.loading) {
          $scope.loading = true;
          $scope.searching = true;
          $http({
            url: 'api/v1/search/organizations_search',
            params: {query: $scope.search_query}
          }).
            success(function(data, status, headers, config) {
              console.log(data)
              angular.forEach(data, resultsFormat)
              $scope.loading = false;
              $scope.loaded = true;
            }).
            error(function(data, status, headers, config) {
            });
        } else if (!$scope.search_query) {
          $scope.searching = false;
        }
      });

    }
  }
});
