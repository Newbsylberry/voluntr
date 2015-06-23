angular.module('voluntrApp').directive("recordedHour", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/recorded_hour.html',
    scope: {
      recordedHour: "="
    },
    restrict: 'E',
    controller: function ($scope, RecordedHours) {


    }
  };
});
