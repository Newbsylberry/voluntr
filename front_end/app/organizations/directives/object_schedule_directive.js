angular.module('voluntrApp').directive("objectSchedule", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/object_schedule.html',
    scope: {
      objectType: "@",
      object: "="
    },
    restrict: 'E',
    controller: function ($scope, $modal) {
      console.log($scope.object)
        $scope.eventSources = [
          {
            url: 'api/v1/' + $scope.objectType + '/' + $scope.object.id + '/schedule'
          }
        ];



      $scope.editSchedule = function (size) {
        var editScheduleModal = $modal.open(
          {
            templateUrl: 'organizations/modals/edit-schedule.html',
            controller: 'EditScheduleCtrl',
            windowClass: 'edit-schedule-window',
            size: size
            //resolve:
            //{
            //  id: function () {
            //    return id
            //  }
            //}
          });



        editScheduleModal.result.then(function () {

          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          });
      };

      $scope.uiConfig = {
        myCalendar:{
          height: 500,
          editable: true,
          header:{
            left: 'month agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next'
          },
          businessHours :
          {
            start: '7:00', // a start time (10am in this example)
            end: '20:00', // an end time (6pm in this example)

            dow: [ 1, 2, 3, 4, 5 ]
            // days of week. an array of zero-based day of week integers (0=Sunday)
            // (Monday-Thursday in this example)
          }
        }

      };
    }
  };
});
