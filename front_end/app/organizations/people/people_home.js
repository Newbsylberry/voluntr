'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('PeopleHomeCtrl', function ($scope, Facebook, $http, $stateParams) {
    $http.get('api/v1/organizations/' + $stateParams.organization_Id + '/people' ).
      success(function(data, status, headers, config) {
         $scope.people = data;
      }).
      error(function(data, status, headers, config) {
        console.log(data)
      });






  });
