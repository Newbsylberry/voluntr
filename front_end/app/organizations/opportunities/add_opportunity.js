'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:AddeventcontrollerCtrl
 * @description
 * # AddeventcontrollerCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('AddOpportunityCtrl', function ($scope, $timeout, Opportunity, $stateParams, $modalStack,
                                              $rootScope, $state, Organization, Facebook, $http, $modal) {


    //$http.get('api/v1/opportunity_types').
    //  success(function(data, status, headers, config) {
    //    $scope.opportunity_types = data;
    //  }).
    //  error(function(data,status, headers, config) {
    //    console.log(data)
    //  })

    $scope.addEventOpportunity = function (size) {
      var organizationEventModal = $modal.open(
        {
          templateUrl: 'organizations/opportunities/organization_add_event_modal.html',
          controller: 'AddOpportunityCtrl',
          windowClass: 'add-event-modal-window',
          size: size
        });

      organizationEventModal.result.then(function () {

        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.days = [];
    for (var i = 0; i <= 30; i++) {
      $scope.days.push(i);
    };

    // Functions and Variables for helping with duration selector
    $scope.duration_label = 'minutes'
    $scope.position_duration = 0;
    $scope.$watch('position_duration', function () {
      if ($scope.position_duration < 3600000){
        $scope.duration_label = 'minutes'
      } else if ($scope.position_duration < (3600000 * 2)) {
        $scope.duration_label = 'hour'
      } else {
        $scope.duration_label = 'hours'
      };
      $scope.newOpportunity.end_time = $scope.newOpportunity.start_time.getTime() + $scope.position_duration;
    });

    $scope.newOpportunity = function(){
      console.log($scope.newOpportunity)
      var attr = {};
      attr.name = $scope.newOpportunity.opportunity_name;
      attr.description = $scope.newOpportunity.description;
      attr.start_time = $scope.newOpportunity.start_time.getTime();
      attr.address = $scope.newOpportunity.address;
      attr.zip_code = $scope.newOpportunity.zip_code;
      attr.city = $scope.newOpportunity.city;
      attr.state = $scope.newOpportunity.state;
      attr.organization_id = $stateParams.organization_Id;
      attr.end_time = $scope.newOpportunity.end_time;
      attr.repeating_event = $scope.newOpportunity.repeating_event;
      attr.daily = $scope.newOpportunity.repeat.repeat_daily;
      attr.weekly = $scope.newOpportunity.repeat.repeat_weekly;
      attr.monthly = $scope.newOpportunity.repeat.repeat_monthly;
      attr.annually = $scope.newOpportunity.repeat.repeat_annually;
      attr.repeat_count = $scope.newOpportunity.repeat_count
      attr.repeat_days = [];

      if ($scope.newOpportunity.sunday_repeat) {
        attr.repeat_days.push(0)
      };
      if ($scope.newOpportunity.monday_repeat) {
        attr.repeat_days.push(1)
      } if ($scope.newOpportunity.tuesday_repeat) {
        attr.repeat_days.push(2)
      } if ($scope.newOpportunity.wednesday_repeat) {
        attr.repeat_days.push(3)
      } if ($scope.newOpportunity.thursday_repeat) {
        attr.repeat_days.push(4)
      } if ($scope.newOpportunity.friday_repeat) {
        attr.repeat_days.push(5)
      } if ($scope.newOpportunity.saturday_repeat) {
        attr.repeat_days.push(6)
      }
      $timeout( function() {
        var geocoder = new google.maps.Geocoder();
        geocoder
          .geocode(
          {
            'address' : $scope.newOpportunity.address
          },
          function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              // for (var i=0; i < results.length; i++) {
              angular.forEach(results, function(result){
                // var result = results[i]
                angular.forEach(result.address_components, function (address_component) {
                  // for (var i=0; i < result.address_components.length; i++) {
                  // var address_component = result.address_components[i]
                  if (address_component.short_name === $scope.newOpportunity.zip_code) {

                    var location = new google.maps.LatLng(result.geometry.location.D, result.geometry.location.k);
                    attr.latitude = result.geometry.location.k;
                    attr.longitude = result.geometry.location.D;
                  }
                })

              })

            }
          })
        $timeout(
          function() {
            var newEvent = Opportunity.create(attr);
            // $rootScope.organization.events.push(newEvent)
            $modalStack. dismissAll();
          }, 3000);
      }, 3000)
    };



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
              var newEvent = Opportunity.create(attr);
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
