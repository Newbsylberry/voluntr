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

    $scope.calendar = {};
    $scope.newOpportunity = function(){
      var attr = {};
      attr.calendar = $scope.calendar;
      if ($scope.calendar.start_time) {
      attr.calendar.start_time = $scope.calendar.start_time.getTime();
      } if ($scope.calendar.repeat.repeat_until) {
      attr.calendar.repeat.repeat_until = $scope.calendar.repeat.repeat_until.getTime();
      }
      attr.name = $scope.newOpportunity.opportunity_name;
      attr.description = $scope.newOpportunity.description;
      attr.address = $scope.newOpportunity.address;
      attr.zip_code = $scope.newOpportunity.zip_code;
      attr.city = $scope.newOpportunity.city;
      attr.state = $scope.newOpportunity.state;
      attr.organization_id = $stateParams.organization_Id;
      attr.volunteer_goal = $scope.newOpportunity.volunteer_goal;
      attr.end_time = $scope.newOpportunity.end_time;

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



    $scope.open = function($event, opened) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope[opened] = true;
    };


  });
