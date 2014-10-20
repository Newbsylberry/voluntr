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
                                               Organization, $http, $timeout,
                                                userLocation) {

        var getDistance = function(event) {
            console.log("Get Distance")
            if (!$scope.events) {
                $scope.events = Array.new
            }
            $timeout(
                function() {
                    var origin = userLocation;
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
                        if (status == google.maps.DistanceMatrixStatus.OK) {
                            event.distance = response.rows[0].elements[0].distance.text;
                            $scope.events.push(event);
                        }
                    }
                }, 250);
        };


        $scope.raw_events = Event.all()

         $scope.getEvents = function() {
            angular.forEach($scope.raw_events, getDistance)
         };








    });

