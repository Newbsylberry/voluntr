'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('EditScheduleCtrl', function ($scope, $cacheFactory) {

    if ($cacheFactory.current_calendar) {
      $scope.editing_calendar = true;
    }
    if ($scope.editing_calendar === true) {
      $scope.start_date_text = "What's the new time of the opportunity?";
      $scope.recurring_label_text = "Edit schedule for future opportunities as well?";
    } else if ($scope.editing_calendar === false) {
      $scope.start_date_text = "What is the first time and date of the opportunity?";
      $scope.recurring_label_text = "Will this be a recurring opportunity?";
    }






  });
