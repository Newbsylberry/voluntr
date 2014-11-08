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
                                                userLocation, $modal) {

        <!-- Set the map center to userLocation -->
        $scope.$on('mapInitialized', function(event, map) {
            map.setCenter(userLocation)

        });



        $scope.getDistance = function(event) {
            console.log("Get Distance")
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
                            $scope.event = event;
                            console.log($scope.event)
                        }
                    }
                }, 2000);
        };


        $scope.events = Event.all()

        // Function that manages the post modal in the side bar
        $scope.open = function (size) {
            if ($scope.profile) {
            var profileModal = $modal.open(
                {
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl',
                size: size
                }) } if (!$scope.profile) {
                var profileModal = $modal.open(
                    {
                        templateUrl: 'views/create_profile.html',
                        controller: 'ProfileCtrl',
                        size: size
                    })}

            profileModal.result.then(function () {
                },
                function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
        };

    });

