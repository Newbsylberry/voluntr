'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:VolunteerhomeCtrl
 * @description
 * # VolunteerhomeCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('VolunteerHomeCtrl', function ($scope, geolocation, Opportunity,
                                             Organization, $http, $timeout,
                                             $modal, $rootScope, leafletData) {


    //leafletData.getMap('map').then(function(map) {
    //
    //})



    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
      $scope.markers =
      {
        m1: {
          lat: $scope.coords.lat,
          lng: $scope.coords.long,
          focus: true,
          message: "Your Current Location"
        }
      };
    })






    $scope.getDistance = function(event) {
      var userLocation = new google.maps.LatLng($scope.coords.lat, $scope.coords.long);
      if (!event.distance && event.latitude && event.longitude) {
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
                console.log(response.rows[0].elements[0])
                event.distance = response.rows[0].elements[0].distance.text;
                $scope.event = event;
              } else if (status !== google.maps.DistanceMatrixStatus.OK) {
                console.log(status)
              }
            }
          }, 700);
      };

    };


    var addOpportunityToMap = function(opportunity) {
      if (opportunity.latitude && opportunity.longitude) {
        $scope.markers[opportunity.name] = {
          lat: opportunity.latitude,
          lng: opportunity.longitude,
          message: opportunity.name
        }
      }
    };

    $scope.$watch('markers', function () {
      if ($scope.markers) {
        Opportunity.all().$promise.then(function(opportunities){
          angular.forEach(opportunities, addOpportunityToMap)
          $scope.opportunities = opportunities;
        })
      }
    });









  });

