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
    controller: function ($scope, $cacheFactory, Opportunity) {


      var setActiveDays = function(day) {
        console.log(day)
        if (day === "MO") {
          $scope.calendar.monday_repeat = true;
        } else if (day === "TU") {
          $scope.calendar.tuesday_repeat = true;
        } else if (day === "WE") {
          $scope.calendar.wednesday_repeat = true;
        } else if (day === "TH") {
          $scope.calendar.thursday_repeat = true;
        } else if (day === "FR") {
          $scope.calendar.friday_repeat = true;
        } else if (day === "SA") {
          $scope.calendar.saturday_repeat = true;
        } else if (day === "SU") {
          $scope.calendar.sunday_repeat = true;
        };
      };


      // Are editing a calendar?
      if ($cacheFactory.current_calendar) {
        $scope.editing_calendar = true;
        $scope.calendar = $cacheFactory.current_calendar;
        if($scope.calendar.schedule) {
          console.log($scope.calendar.schedule)
          $scope.calendar.repeating_event = true;
          console.log(parseInt($scope.calendar.schedule.INTERVAL))
          $scope.calendar.repeat_count = parseInt($scope.calendar.schedule.INTERVAL);
          $scope.calendar.repeat = {};
          if ($scope.calendar.schedule.FREQ === "DAILY") {
            $scope.calendar.repeat.repeat_daily = true;
          } else if ($scope.calendar.schedule.FREQ === "WEEKLY") {
            $scope.calendar.repeat.repeat_weekly = true;
          } else if ($scope.calendar.schedule.FREQ === "MONTHLY") {
            $scope.calendar.repeat.repeat_monthly = true;
          } else if ($scope.calendar.schedule.FREQ === "ANNUALLY") {
            $scope.calendar.repeat.repeat_annually = true;
          }
          angular.forEach($scope.calendar.schedule.BYDAY, setActiveDays)
        };
      };



      $scope.$watch('calendar.duration', function () {
        console.log($scope.calendar.duration);
        if ($scope.calendar.duration < 3600000){
          $scope.duration_label = 'minutes'
        } else if ($scope.calendar.duration < (3600000 * 2)) {
          $scope.duration_label = 'hour'
        } else {
          $scope.duration_label = 'hours'
        };
        $scope.calendar.end_time = $scope.calendar.start_date.getTime() + $scope.calendar.duration;
      });



      console.log($scope.calendar)




      $scope.calendarCreate = function () {
        var attr = {};
        attr.id = $scope.calendar.id;
        attr.repeating_event = $scope.calendar.repeating_event;
        attr.repeat_count = $scope.calendar.repeat_count;
        attr.end_time = $scope.calendar.end_time;
        attr.repeat_days = [];
        attr.start_time = $scope.calendar.start_date.getTime();
        if ($scope.calendar.repeat) {
          attr.schedule = true
          attr.daily = $scope.calendar.repeat.repeat_daily;
          attr.weekly = $scope.calendar.repeat.repeat_weekly;
          attr.monthly = $scope.calendar.repeat.repeat_monthly;
          attr.annually = $scope.calendar.repeat.repeat_annually;
        }
        if ($scope.calendar.sunday_repeat) {
          attr.repeat_days.push(0)
        };
        if ($scope.calendar.monday_repeat) {
          attr.repeat_days.push(1)
        } if ($scope.calendar.tuesday_repeat) {
          attr.repeat_days.push(2)
        } if ($scope.calendar.wednesday_repeat) {
          attr.repeat_days.push(3)
        } if ($scope.calendar.thursday_repeat) {
          attr.repeat_days.push(4)
        } if ($scope.calendar.friday_repeat) {
          attr.repeat_days.push(5)
        } if ($scope.calendar.saturday_repeat) {
          attr.repeat_days.push(6)
        }
        if ($scope.calendar.type === "Opportunity") {
          Opportunity.update(attr)
        };
      };



    }
  };
});
