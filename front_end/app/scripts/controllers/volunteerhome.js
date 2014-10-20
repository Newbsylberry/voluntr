'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:VolunteerhomeCtrl
 * @description
 * # VolunteerhomeCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('VolunteerHomeCtrl', function ($scope, geolocation, Event,
                                             Organization, $http, $timeout) {
        geolocation.getLocation().then(function(data){
            $scope.user_location = {lat:data.coords.latitude,long:data.coords.longitude};

            console.log($scope.user_location)
        });

        $scope.events = Event.all();

        $scope.$on('mapInitialized', function(event, map) {



        });

        $scope.getDistance = function(event) {
            $timeout(
            function() {
                var origin = '235 Harrison St. Syracuse, NY'
                var destination = new google.maps.LatLng(event.latitude, event.longitude);
                var distanceMatrix = new google.maps.DistanceMatrixService();
                distanceMatrix.getDistanceMatrix(
                     {
                         origins: [(origin)],
                         destinations: [(destination)],
                         travelMode: google.maps.TravelMode.DRIVING,
                         unitSystem: google.maps.UnitSystem.IMPERIAL
                     }, callback);
                function callback(response, status) {
                    event.distance = response.rows[0].elements[0].distance.text;
                    console.log(event)
                    return $scope.event = event;
                }
            }, 250);
        };



  });

