'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('OpportunitiesHomeCtrl', function ($scope, $rootScope, Facebook, $stateParams,
                                                 $http, $state, $filter, uiCalendarConfig,
                                                 $modal, Opportunity,$mdDialog) {

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
        timezone: 'local',
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



    //$scope.opportunityDetail = function (size, id, start_time) {
    //  var opportunityDetailModal = $modal.open(
    //    {
    //      templateUrl: 'organizations/modals/opportunity_detail.html',
    //      controller: 'OpportunityDetailCtrl',
    //      windowClass: 'create-opportunity-modal',
    //      size: size,
    //      resolve:
    //      {
    //        id: function () {
    //          return id
    //        },
    //        start_time: function() {
    //          return start_time;
    //        },
    //        opportunity: function(){
    //          return $http.get('api/v1/opportunities/' + id, {params: {instance_date: new Date(start_time).getTime()}}).
    //            success(function(data, status, headers, config) {
    //              console.log(data)
    //            })
    //        }
    //      }
    //    });
    //  opportunityDetailModal.result.then(function () {
    //
    //    },
    //    function () {
    //      console.log('Modal dismissed at: ' + new Date());
    //    });
    //};
    var opportunityDetailId;
    var opportunityDetailStartTime;
    $scope.opportunityDetail = function(id, start_time){
      opportunityDetailId = id;
      opportunityDetailStartTime = start_time;
      $mdDialog.show({
        controller: 'OpportunityDetailCtrl',
        templateUrl: 'organizations/modals/opportunity_detail.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        locals: {
          id: id,
          start_time: start_time,
          opportunity: $http.get('api/v1/opportunities/' + id, {params: {instance_date: new Date(start_time).getTime()}})
        }
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    $rootScope.$on('openOpportunityDetail', function() {
      $scope.opportunityDetail(opportunityDetailId, opportunityDetailStartTime);

    });

    $scope.uiConfig.myCalendar.eventClick = function(calEvent, jsEvent, view) {
      $scope.opportunityDetail(calEvent.id, calEvent._start._i);
    };

  });
