angular.module('voluntrApp').directive("personSchedule", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/person_schedule.html',
    scope: {
      personId: "@",
      schedule: "=",
    },
    restrict: 'E',
    controller: function ($scope, Opportunity, $modal) {

      if (!$scope.schedule) {
        $scope.schedule = {};
      }

      if (!$scope.schedule.morning) {
        $scope.schedule.morning = {};
      } if (!$scope.schedule.afternoon) {
        $scope.schedule.afternoon = {};
      } if (!$scope.schedule.night) {
        $scope.schedule.night = {};
      }

      if ($scope.schedule.morning.monday == true
        || $scope.schedule.afternoon.monday == true
        || $scope.schedule.night.monday == true ) {
        $scope.Mon = true;
      } if ($scope.schedule.morning.tuesday == true
        || $scope.schedule.afternoon.tuesday == true
        || $scope.schedule.night.tuesday == true ) {
        $scope.Tue = true;
      } if ($scope.schedule.morning.wednesday == true
        || $scope.schedule.afternoon.wednesday == true
        || $scope.schedule.night.wednesday == true ) {
        $scope.Wed = true;
      } if ($scope.schedule.morning.thursday == true
        || $scope.schedule.afternoon.thursday == true
        || $scope.schedule.night.thursday == true ) {
        $scope.Thu = true;
      } if ($scope.schedule.morning.friday == true
        || $scope.schedule.afternoon.friday == true
        || $scope.schedule.night.friday == true ) {
        $scope.Fri = true;
      } if ($scope.schedule.morning.saturday == true
        || $scope.schedule.afternoon.saturday == true
        || $scope.schedule.night.saturday == true ) {
        $scope.Sat = true;
      }if ($scope.schedule.morning.sunday == true
        || $scope.schedule.afternoon.sunday == true
        || $scope.schedule.night.sunday == true ) {
        $scope.Sun = true;
      };



    }
  }
});
