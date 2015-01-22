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
                                             $modal, $rootScope,
                                             User) {


    //User.get({user_Id: localStorage.user_id}, function (successResponse) {
    //
    //    //This is where the user is actually assigned, all of its related
    //    // JSON is accessed in the view through $scope.user (e.g. - $scope.user.posts)
    //    $rootScope.user = successResponse;
    //
    //}, function(errorResponse) {
    //
    //});




    //
    $scope.loaded = false;
    console.log($scope.loaded);

    $timeout(
      function() {
        $scope.loaded = true;
      }, 3000);


    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });

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

    $scope.events = Event.all()
    console.log($scope.events)






      $scope.$on('mapInitialized', function(event, map) {


      });






    //// Function that manages the post modal in the side bar
    //$scope.open = function (size) {
    //
    //    var profileModal = $modal.open(
    //        {
    //            templateUrl: 'views/profile_create.html',
    //            controller: 'ProfileCreateCtrl',
    //            windowClass: 'create-profile-modal-window',
    //            size: size
    //        })
    //
    //    profileModal.result.then(function () {
    //        },
    //        function () {
    //
    //        });
    //};

  });

