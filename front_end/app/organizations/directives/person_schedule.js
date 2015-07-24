angular.module('voluntrApp').directive("personSchedule", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/person_schedule.html',
    scope: {
      personId: "@"
    },
    restrict: 'E',
    controller: function ($scope, Opportunity, $modal) {

      $scope.morning = {};
      $scope.afternoon = {};
      $scope.night = {};

      $scope.updateWithSchedule = function() {
        var attr = {};
        attr.id = $scope.personId;
        attr.schedule = {};
        attr.schedule.morning = $scope.morning;
        attr.schedule.afternoon = $scope.afternoon;
        attr.schedule.night = $scope.night;
        $scope.submitted = true;
        People.update(attr).$promise.then(function(person){
          $scope.person = person
        });
      }



    }
  }
});
