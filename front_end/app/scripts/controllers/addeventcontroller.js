'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:AddeventcontrollerCtrl
 * @description
 * # AddeventcontrollerCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('AddEventCtrl', function ($scope, $timeout, Event, $stateParams, $modalStack,
                                        $rootScope, $state, Organization, Facebook, $http) {


    var addFacebookEvents = function(event) {
      if (!$scope.events) {
        var events = [];
        $scope.facebook_events = events;
      };
      Facebook.api('/' + event.id, function(response) {
        event = response;
        $http({method: 'GET',
          url: '/api/v1/events/existence_check/' + event.id}).
          success(function(data, status, headers, config) {
            if (!data) {
              $scope.facebook_events.push(event);
            }
          }).
          error(function(data, status, headers, config) {
          })

      })
    };


    Organization.get({organization_Id: $stateParams.organization_Id}, function(successResponse) {
      Facebook.api('/' + successResponse.fb_id + '/events', function (response) {
        angular.forEach(response.data, addFacebookEvents)
      });
    });





    $scope.addEvent = function(event, event_entry) {
      var attr = {};
      if (event_entry === 'manual_event'){
      attr.name = $scope.addEvent.event_name;
      attr.description = $scope.addEvent.description;
      attr.start_time = new Date($scope.addEvent.start_time);
      attr.end_time =  new Date($scope.addEvent.end_time);
      attr.organization_id = $stateParams.organization_Id;
      $timeout( function() {
        var geocoder = new google.maps.Geocoder();
        geocoder
          .geocode(
          {
            'address' : $scope.addEvent.address
          },
          function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              // for (var i=0; i < results.length; i++) {
              angular.forEach(results, function(result){
                // var result = results[i]
                angular.forEach(result.address_components, function (address_component) {
                  // for (var i=0; i < result.address_components.length; i++) {
                  // var address_component = result.address_components[i]
                  if (address_component.short_name === $scope.addEvent.zip_code) {

                    var location = new google.maps.LatLng(result.geometry.location.D, result.geometry.location.k);
                    console.log(location)
                    attr.latitude = result.geometry.location.k;
                    attr.longitude = result.geometry.location.D;
                  }
                })

              })

            }
          })
        $timeout(
          function() {
            var newEvent = Event.create(attr);
            // $rootScope.organization.events.push(newEvent)
            $modalStack. dismissAll();
            $state.transitionTo($state.current, $stateParams, {
              reload: true,
              inherit: false,
              notify: true
            });
          }, 3000);
      }, 3000)
      } else if (event_entry === 'facebook_event') {
        attr.fb_id = event.id;
        attr.name = event.name;
        attr.location = event.location;
        attr.description = event.description;
        attr.latitude = event.venue.latitude;
        attr.longitude = event.venue.longitude;
        attr.start_time = event.start_time;
        attr.end_time = event.end_time;
        attr.timezone = event.timezone;
        attr.organization_id = $stateParams.organization_Id;
        var newEvent = Event.create(attr);
        newEvent.exists = true;
        $scope.event = newEvent;
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
        $modalStack. dismissAll();
      }
    };



    $scope.open = function($event, opened) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope[opened] = true;
    };


  });
