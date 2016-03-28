/**
 * Created by chrismccarthy on 4/6/15.
 */
/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('AuxiliaryModalWindowCtrl', function ($scope, $modal, type, object,
                                                    $modalInstance, Opportunity,
                                                    People, object_id, uiCalendarConfig) {

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



    if ($scope.type == 'recurring-schedule' || $scope.type == 'create-opportunity') {
      $scope.calendar = object;
      $scope.calendar.repeating_event = true;
    }

    if ($scope.type === 'edit-schedule') {
      if (object.duration) {
        $scope.calendar.duration = object.duration * 3600000
      }
      $scope.editing_calendar = true;
      $scope.calendar.raw_start = new Date(object.start_time)
      $scope.calendar.schedule = object.ical;
      $scope.calendar.id = object.id;
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
        attr.calendar.repeat.repeat_until = $scope.calendar.repeat.repeat_until;
      }
      attr.id = $scope.calendar.id;
      Opportunity.update_schedule(attr)
      var queryResult = document.getElementsByClassName("modal-dialog")
      queryResult[0].classList.remove('auxiliary-open')

      $modalInstance.close();
    };

    $scope.addSchedule = function() {
      var attr = {};
      attr.name = $scope.calendar.name;
      attr.calendar = $scope.calendar;
      attr.id = object_id;
      People.add_schedule(attr).$promise.then(function(person){
        uiCalendarConfig.calendars['calendar'].fullCalendar('refetchEvents', $scope.eventSources);
        var queryResult = document.getElementsByClassName("modal-dialog")
        queryResult[0].classList.remove('auxiliary-open')
        $modalInstance.close();
      });
    };

    $scope.closeWindow = function(){
      var queryResult = document.getElementsByClassName("modal-dialog")
      queryResult[0].classList.remove('auxiliary-open')
      $modalInstance.close();
    }
  });

