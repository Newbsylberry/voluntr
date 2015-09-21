angular.module('voluntrApp').directive("findPerson", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/find_person.html',
    scope: {
      person: "="
    },
    restrict: 'E',
    controller: function ($scope, $http, $stateParams) {
      var peopleResults = function(raw_result) {
        var base_result = raw_result._source
        var person = {}
        person.id = base_result.person_id;
        person.first_name = base_result.person.first_name;
        person.last_name = base_result.person.last_name;
        person.score = raw_result.score;
        if ($scope.people.indexOf(person) == -1) {
          console.log("push")
          $scope.people.push(person)
        }
      };

      $scope.searching = false;
      $scope.people_search = function (search) {
        $scope.people = [];
        console.log($scope.people)
        if (search && !$scope.searching) {
          $scope.searching = true;
          $scope.no_search = false;
          $http({
            url: 'api/v1/organizations/' + $stateParams.organization_Id + '/people_search',
            params: {query: search}
          }).
            success(function(data, status, headers, config) {
              angular.forEach(data, peopleResults)
              $scope.searching = false;
            }).
            error(function(data, status, headers, config) {
            });
        } else if (!search) {
          $scope.searching = false;
          $scope.no_search = true;
        }
      };

      $scope.selectPerson = function(person) {
        $scope.person = person;
        $scope.volunteer_search = $scope.person.first_name + " " + $scope.person.last_name;
        $scope.no_search = true;
      }

    }
  };
});
