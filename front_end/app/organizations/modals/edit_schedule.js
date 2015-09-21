'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('EditScheduleCtrl', function ($scope, $cacheFactory, Opportunity, $modalInstance) {


    var setActiveDays = function(day) {
      if (day === "MO") {
        $scope.calendar.repeat.monday_repeat = true;
      } else if (day === "TU") {
        $scope.calendar.repeat.tuesday_repeat = true;
      } else if (day === "WE") {
        $scope.calendar.repeat.wednesday_repeat = true;
      } else if (day === "TH") {
        $scope.calendar.repeat.thursday_repeat = true;
      } else if (day === "FR") {
        $scope.calendar.repeat.friday_repeat = true;
      } else if (day === "SA") {
        $scope.calendar.repeat.saturday_repeat = true;
      } else if (day === "SU") {
        $scope.calendar.repeat.sunday_repeat = true;
      };
    };


    // Are editing a calendar?
    if ($cacheFactory.current_calendar) {
      $scope.editing_calendar = true;
      $scope.calendar = $cacheFactory.current_calendar;
      if($scope.calendar.schedule) {
        $scope.calendar.repeating_event = true;
        $scope.calendar.repeat = {};
        $scope.calendar.repeat.repeat_count = parseInt($scope.calendar.schedule.INTERVAL);
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

    $scope.updateSchedule = function() {
      var attr = {};
      attr.calendar = $scope.calendar;
      if ($scope.calendar.start_time) {
        attr.calendar.start_time = $scope.calendar.start_time.getTime();
      }
      if ($scope.calendar.repeat.repeat_until) {
        attr.calendar.repeat.repeat_until = $scope.calendar.repeat.repeat_until.getTime();
      }
      attr.id = $scope.calendar.id;
      Opportunity.update(attr)
      $modalInstance.close();
    };





  });
