'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('GroupDetailCtrl', function ($scope, id, Group, $timeout) {

    Group.get({group_Id: id}, function(successResponse) {
      $scope.group = successResponse;
      console.log(successResponse)
    });

  });
