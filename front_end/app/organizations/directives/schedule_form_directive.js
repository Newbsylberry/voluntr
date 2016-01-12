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
    controller: function ($scope, $http, Schedule) {

      $scope.calendar.repeat.monthly_repeat_type = {};

      $scope.current_screen = 'repeat_type';

      $scope.previousScreen = function(current_screen) {
        if (current_screen === 'repeat_frequency') {
          $scope.current_screen = 'repeat_type'
        } if (current_screen === 'repeat_daily' ||
          current_screen === 'repeat_weekly' ||
          current_screen === 'repeat_monthly' ||
          current_screen === 'repeat_annually') {
          $scope.current_screen = 'repeat_frequency'
        }
      };

      $scope.nextScreen = function(current_screen, saved_value) {
        if (current_screen === 'repeat_type') {
          $scope.calendar.repeat.repeat_type = saved_value;
          $scope.current_screen = 'repeat_frequency';
        } if (current_screen === 'repeat_frequency') {
          $scope.calendar.repeat.repeat_count = saved_value;
          $scope.current_screen = $scope.calendar.repeat.repeat_type;
        } if (current_screen === 'repeat_daily' ||
          current_screen === 'repeat_weekly' ||
          current_screen === 'repeat_monthly' ||
          current_screen === 'repeat_annually') {
          $scope.current_screen = 'opportunity_end';
        }
      };

      $scope.$watch('calendar', function(oldValue, newValue) {

        if ($scope.calendar.start_time === undefined) {
          $scope.start_time = true;
        } if ($scope.calendar.end_time === undefined) {
          $scope.end_time = true;
        }
        if (oldValue.duration === newValue.duration && oldValue.end_time === newValue.end_time) {
          var watch = true;
        }

        if ($scope.calendar.start_time && watch) {
          console.log(oldValue)
          console.log(oldValue.duration + " " + newValue.duration)
          var attr = {};
          attr.calendar = $scope.calendar;
          Schedule.schedule_string(attr.calendar).$promise.then(function(data){
            $scope.schedule_string = data.schedule;
          })
        }
      }, true);

      $scope.$watch('calendar.duration', function () {
        if ($scope.calendar.duration < 3600000){
          $scope.duration_label = 'minutes'
        } else if ($scope.calendar.duration < (3600000 * 2)) {
          $scope.duration_label = 'hour'
        } else {
          $scope.duration_label = 'hours'
        };
        $scope.calendar.end_time = $scope.calendar.start_time.getTime() + $scope.calendar.duration;
      });

    }
  };
});
