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




    $scope.events = [];

    var formatOpportunity = function(opportunity) {
      var formatted_opportunity = {};
      formatted_opportunity.id = opportunity.id;
      formatted_opportunity.title = opportunity.name;
      formatted_opportunity.start = $filter('date')(opportunity.start_time, 'yyyy-MM-ddTHH:mm:ss');
      formatted_opportunity.end = $filter('date')(opportunity.end_time, 'yyyy-MM-ddTHH:mm:ss');
      formatted_opportunity.all_day = false;
      $scope.events.push(formatted_opportunity);
      console.log($scope.events)
    };

    $scope.eventSources = [$scope.events]

    $http.get('api/v1/organizations/' + $stateParams.organization_Id + '/opportunities' ).
      success(function(data, status, headers, config) {
        angular.forEach(data, formatOpportunity);
      }).
      error(function(data, status, headers, config) {
        console.log(data)
      });



    $scope.changeView = function(view,calendar) {
      console.log(uiCalendarConfig.calendars.myCalendar)
      uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView',view);
    };



  });
