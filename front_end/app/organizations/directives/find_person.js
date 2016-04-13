angular.module('voluntrApp').directive("findPerson", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/find_person.html',
    scope: {
      personId: "=",
      person: "="
    },
    restrict: 'E',
    controller: function ($scope, $http, $stateParams) {

      $scope.no_email = false;

      var peopleResults = function(raw_result) {
        var base_result = raw_result._source
        var person = {}
        $scope.results = true;
        person.id = base_result.person_id;
        person.first_name = base_result.person.first_name;
        person.last_name = base_result.person.last_name;
        person.email = base_result.person.email;
        person.phone = base_result.person.phone;
        person.id = base_result.person.id;
        person.score = raw_result.score;
        if ($scope.people.indexOf(person) == -1) {
          $scope.people.push(person)
        }
        if ($scope.people.length < 0) {
          $scope.results = false;
        }
      };

      $scope.searching = false;
      $scope.search_load = true;

      $scope.$watchCollection('person', function(){
        $scope.people = [];
        var search = $scope.person.first_name + ' ' + $scope.person.last_name + ' ' + $scope.person.email + ' ' + $scope.person.phone;
        if (!$scope.searching) {
          $scope.searching = true;
          $http({
            url: 'api/v1/organizations/' + $stateParams.organization_Id + '/people_search',
            params: {query: search}
          }).
            success(function(data, status, headers, config) {
              angular.forEach(data, peopleResults);
              $scope.searching = false;
            }).
            error(function(data, status, headers, config) {
            });
        }
      })

      $scope.selectPerson = function(person) {
        $scope.person = person;
        $scope.personId = person.id;
        // $scope.no_search = true;
      }

      $scope.clearPerson = function(){
        $scope.person.first_name = '';
        $scope.person.last_name = '';
        $scope.person.email = '';
        $scope.person.phone = '';
        $scope.personId = {};
      }
    }
  };
});
