'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:RecordhoursCtrl
 * @description
 * # RecordhoursCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('RecordHoursCtrl', function ($scope, Event, UserEventHours, $modal,
                                           $modalInstance, $rootScope) {

        $scope.events = Event.all();

        $scope.hours1 = 0;
        $scope.hours2 = 0;

        $scope.h1_up = function() {
            if ($scope.hours1 < 9)
            $scope.hours1 += 1;
        };
        $scope.h2_up = function() {
            if ($scope.hours2 < 9)
                $scope.hours2 += 1;
        };

        $scope.h1_down = function() {
            if ($scope.hours1 > 0)
                $scope.hours1 -= 1;
        };
        $scope.h2_down = function() {
            if ($scope.hours2 > 0)
                $scope.hours2 -= 1;
        };

        $scope.recordHours = function() {
            var hoursTotal = ( $scope.hours1 * 10 + $scope.hours2)
            var attr = {};
            attr.event_id = $scope.recordHours.event_id;
            attr.user_id = localStorage.user_id;
            attr.description = $scope.description;
            attr.hours = hoursTotal;
            var recordedHours = UserEventHours.create(attr);
            $rootScope.recordedHours = recordedHours.hours;
            $modalInstance.close();
        };

  });
