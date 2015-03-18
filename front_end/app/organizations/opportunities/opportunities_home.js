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
                                                 $http, $state, $filter, uiCalendarConfig, $modal) {




    $scope.eventSources = [
      {
        url: 'api/v1/organizations/' + $stateParams.organization_Id + '/opportunities'
      }
    ];


    $scope.uiConfig = {
      myCalendar:{
        height: 500,
        editable: true,
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


    $scope.opportunityDetail = function (size, id) {
      var opportunityDetailModal = $modal.open(
        {
          templateUrl: 'organizations/opportunities/opportunity_detail_modal.html',
          controller: 'OpportunityDetailCtrl',
          windowClass: 'add-event-modal-window',
          size: size,
          resolve:
          {
            id: function () {
              return id
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
      console.log(calEvent)
      console.log(jsEvent)
      console.log(view)
      $scope.opportunityDetail('lg', calEvent.id);


    };





  });
