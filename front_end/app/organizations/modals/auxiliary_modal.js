/**
 * Created by chrismccarthy on 4/6/15.
 */
/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('AuxiliaryModalWindowCtrl', function ($scope, $modal, type, object,
                                                    $modalInstance, Opportunity) {


    $scope.calendar = {};
    $scope.calendar.repeat = {};
    $scope.calendar.repeat.monthly_repeat_type = {};

    $scope.type = type;


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



    if ($scope.type == 'recurring-schedule') {
      $scope.calendar = object;
      $scope.calendar.repeating_event = true;
    }

    // Are editing a calendar?
    if ($scope.type === 'edit-schedule') {
      $scope.editing_calendar = true;
      $scope.calendar.schedule = object.ical;
      $scope.calendar.id = object.id;
      $scope.calendar.duration = object.duration;
      if($scope.calendar.schedule) {
        $scope.calendar.repeating_event = true;
        $scope.calendar.repeat = {};
        $scope.calendar.repeat.repeat_count = parseInt($scope.calendar.schedule.INTERVAL);
        if ($scope.calendar.schedule.FREQ === "DAILY") {
          $scope.calendar.repeat.repeat_daily = true;
          $scope.calendar.repeat.repeat_type = 'repeat_daily';
        } else if ($scope.calendar.schedule.FREQ === "WEEKLY") {
          $scope.calendar.repeat.repeat_weekly = true;
          $scope.calendar.repeat.repeat_type = 'repeat_weekly';
        } else if ($scope.calendar.schedule.FREQ === "MONTHLY") {
          $scope.calendar.repeat.repeat_monthly = true;
          $scope.calendar.repeat.repeat_type = 'repeat_monthly';
        } else if ($scope.calendar.schedule.FREQ === "ANNUALLY") {
          $scope.calendar.repeat.repeat_annually = true;
          $scope.calendar.repeat.repeat_type = 'repeat_annually';
        }
        console.log(typeof $scope.calendar.schedule.BYDAY);
        if (typeof $scope.calendar.schedule.BYDAY === 'string') {
          $scope.calendar.schedule.BYDAY = $scope.calendar.schedule.BYDAY.split(",")
        }
        angular.forEach($scope.calendar.schedule.BYDAY, setActiveDays)
      };
    };

    $scope.updateSchedule = function() {
      var attr = {};
      attr.calendar = $scope.calendar;
      if ($scope.calendar.repeat.repeat_until) {
        attr.calendar.repeat.repeat_until = $scope.calendar.repeat.repeat_until.getTime();
      }
      attr.id = $scope.calendar.id;
      Opportunity.update_schedule(attr)
      var queryResult = document.getElementsByClassName("modal-dialog")
      queryResult[0].classList.remove('auxiliary-open')
      $modalInstance.close();
    };

    $scope.closeWindow = function(){
      var queryResult = document.getElementsByClassName("modal-dialog")
      queryResult[0].classList.remove('auxiliary-open')
      $modalInstance.close();
    }
  });

