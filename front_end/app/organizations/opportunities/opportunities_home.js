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
                                                 $http, $state, $filter, uiCalendarConfig) {




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
        }
      }
    };







  });
