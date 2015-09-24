angular.module('voluntrApp').directive("personSchedule", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/person_schedule.html',
    scope: {
      personId: "@",
      morning: "=",
      afternoon: "=",
      night: "="
    },
    restrict: 'E',
    controller: function ($scope, Opportunity, $modal) {




    }
  }
});
