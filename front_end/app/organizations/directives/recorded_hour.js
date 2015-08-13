angular.module('voluntrApp').directive("recordedHour", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/recorded_hour.html',
    scope: {
      recordedHour: "=",
      recordedHours: "=",
      type: "@"
    },
    restrict: 'E',
    controller: function ($scope, RecordedHours) {
      $scope.editing = false;
      $scope.saveRecordedHours = function(recorded_hour) {
        var attr = {};
        attr.id = recorded_hour.id;
        attr.hours = recorded_hour.hours;
        if (recorded_hour.opportunity_role) {
        attr.opportunity_role_id = recorded_hour.opportunity_role.id;
        }
        RecordedHours.update(attr)
        $scope.editing = false;
      };

      $scope.deleteRecordedHour = function(recorded_hour) {
        RecordedHours.delete(recorded_hour.id)
        var index = $scope.recordedHours.indexOf(recorded_hour);
        if (index > -1) {
          $scope.recordedHours.splice(index, 1);
        }
      };
    }
  };
});


