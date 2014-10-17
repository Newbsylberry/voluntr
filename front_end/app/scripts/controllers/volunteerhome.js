'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:VolunteerhomeCtrl
 * @description
 * # VolunteerhomeCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('VolunteerHomeCtrl', function ($scope, geolocation, Event, Organization) {
        $scope.user_location = geolocation.getLocation().then(function(data){
            return {lat:data.coords.latitude, long:data.coords.longitude};
        });

        $scope.events = Event.all();

  });
