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
                                              $rootScope, $state, Organization, Facebook,
                                              $http, $modal) {

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


    //// Functions and Variables for helping with duration selector
    //$scope.duration_label = 'minutes'
    //$scope.position_duration = 3600000;
    //
    //$scope.$watch('newOpportunity.position_duration', function () {
    //  console.log($scope.newOpportunity.position_duration);
    //  if ($scope.newOpportunity.position_duration < 3600000){
    //    $scope.duration_label = 'minutes'
    //  } else if ($scope.newOpportunity.position_duration < (3600000 * 2)) {
    //    $scope.duration_label = 'hour'
    //  } else {
    //    $scope.duration_label = 'hours'
    //  };
    //  $scope.newOpportunity.end_time = $scope.newOpportunity.start_time.getTime() + $scope.newOpportunity.position_duration;
    //});

    $scope.calendar = {};
    $scope.newOpportunity = function(){
      var attr = {};
      attr.calendar = $scope.calendar;
      attr.calendar.start_time = $scope.calendar.start_time.getTime();
      attr.name = $scope.newOpportunity.opportunity_name;
      attr.description = $scope.newOpportunity.description;
      attr.address = $scope.newOpportunity.address;
      attr.zip_code = $scope.newOpportunity.zip_code;
      attr.city = $scope.newOpportunity.city;
      attr.state = $scope.newOpportunity.state;
      attr.organization_id = $stateParams.organization_Id;
      attr.volunteer_goal = $scope.newOpportunity.volunteer_goal;
      attr.end_time = $scope.newOpportunity.end_time;
      console.log(attr.calendar)

      //attr.repeating_event = $scope.newOpportunity.repeating_event;
      //attr.repeat_count = $scope.newOpportunity.repeat_count
      //attr.repeat_days = [];
      //attr.start_time = $scope.newOpportunity.start_time.getTime();

      //$timeout( function() {
      //  var geocoder = new google.maps.Geocoder();
      //  geocoder
      //    .geocode(
      //    {
      //      'address' : $scope.newOpportunity.address
      //    },
      //    function(results, status) {
      //      if (status == google.maps.GeocoderStatus.OK) {
      //        // for (var i=0; i < results.length; i++) {
      //        angular.forEach(results, function(result){
      //          // var result = results[i]
      //          angular.forEach(result.address_components, function (address_component) {
      //            // for (var i=0; i < result.address_components.length; i++) {
      //            // var address_component = result.address_components[i]
      //            if (address_component.short_name === $scope.newOpportunity.zip_code) {
      //
      //              var location = new google.maps.LatLng(result.geometry.location.D, result.geometry.location.k);
      //              attr.latitude = result.geometry.location.k;
      //              attr.longitude = result.geometry.location.D;
      //            }
      //          })
      //
      //        })
      //
      //      }
      //    })
      //  $timeout(
      //    function() {
      //      var newEvent = Opportunity.create(attr);
      //      // $rootScope.organization.events.push(newEvent)
      //      $modalStack. dismissAll();
      //    }, 3000);
      //}, 3000)

      Opportunity.create(attr)
    };



    //var addFacebookEvents = function(event) {
    //  if (!$scope.events) {
    //    var events = [];
    //    $scope.facebook_events = events;
    //  };
    //  Facebook.api('/' + event.id, function(response) {
    //    event = response;
    //    $http({method: 'GET',
    //      url: '/api/v1/events/existence_check/' + event.id}).
    //      success(function(data, status, headers, config) {
    //        if (!data) {
    //          $scope.facebook_events.push(event);
    //        }
    //      }).
    //      error(function(data, status, headers, config) {
    //      })
    //
    //  })
    //};


    //Organization.get({organization_Id: $stateParams.organization_Id}, function(successResponse) {
    //  Facebook.api('/' + successResponse.fb_id + '/events', function (response) {
    //    angular.forEach(response.data, addFacebookEvents)
    //  });
    //});



    $scope.open = function($event, opened) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope[opened] = true;
    };


  });
