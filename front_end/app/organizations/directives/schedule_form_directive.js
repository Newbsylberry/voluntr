angular.module('voluntrApp').directive("scheduleForm", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/schedule-form.html',
    scope: {
      recurringLabelText: "@",
      startDateText: "@",
      calendar: "="
    },
    restrict: 'E',
    controller: function ($scope) {






      $scope.$watch('calendar.duration', function () {
        console.log($scope.calendar.duration);
        if ($scope.calendar.duration < 3600000){
          $scope.duration_label = 'minutes'
        } else if ($scope.calendar.duration < (3600000 * 2)) {
          $scope.duration_label = 'hour'
        } else {
          $scope.duration_label = 'hours'
        };
        // $scope.calendar.end_time = $scope.calendar.start_time.getTime() + $scope.calendar.duration;
      });












    }
  };
});
