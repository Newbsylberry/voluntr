'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('OpportunitiesHomeCtrl', function ($scope, Facebook, $stateParams,
                                                 $http, $state, $filter, uiCalendarConfig,
                                                 $modal, Opportunity) {

    $scope.eventSources = [
      {
        url: 'api/v1/organizations/' + $stateParams.organization_Id + '/opportunities'
      },
      []
    ];

    $scope.uiConfig = {
      myCalendar:{
        height: 500,
        editable: true,
        eventTextColor: 'white',
        header:{
          left: 'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        businessHours :
        {
          start: '7:00', // a start time (10am in this example)
          end: '20:00', // an end time (6pm in this example)

          dow: [ 1, 2, 3, 4, 5 ]
          // days of week. an array of zero-based day of week integers (0=Sunday)
          // (Monday-Thursday in this example)
        }
      }
    };



    $scope.opportunityDetail = function (size, id, start_time) {
      var opportunityDetailModal = $modal.open(
        {
          templateUrl: 'organizations/modals/opportunity_detail_modal.html',
          controller: 'OpportunityDetailCtrl',
          windowClass: 'add-event-modal-window',
          size: size,
          resolve:
          {
            id: function () {
              return id
            },
            start_time: function() {
              return start_time;
            },
            opportunity: function(){
              return $http.get('api/v1/opportunities/' + id, {params: {instance_date: new Date(start_time).getTime()}}).
                success(function(data, status, headers, config) {
                })
            }
          }
        });



      opportunityDetailModal.result.then(function () {

        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    };


    $scope.uiConfig.myCalendar.eventClick = function(calEvent, jsEvent, view) {
      $scope.opportunityDetail('lg', calEvent.id, calEvent.start_time);
    };





  });
