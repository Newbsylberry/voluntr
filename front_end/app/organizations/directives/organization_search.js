angular.module('voluntrApp').directive("organizationSearch", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/organization_search.html',
    scope: {
      organization: "=",
      selectedOrganizations: "=",
      type: "@"
    },
    restrict: 'E',
    controller: function ($scope, $http) {
      var resultsFormat = function(raw_result) {
        console.log(raw_result)
        var base_result = raw_result._source
        var result = {}
          result.id = base_result.id;
          result.name = base_result.name;
          result.city = base_result.city;
          result.state = base_result.state;
        $scope.organizations.push(result)
      };

      $scope.addOrganization = function(organization){
        if ($scope.type === 'multiple') {
          $scope.selectedOrganizations.push(organization)
          $scope.search_query = '';
        } if ($scope.type === 'single'){
          $scope.organization = organization;
          $scope.search_query = '';
        }
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
