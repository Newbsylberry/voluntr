'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('AddPeopleCtrl', function ($scope, Facebook, $stateParams, $http, $state, People) {



    // Code for the modal
    $scope.newPerson = {};

    $scope.addPerson = function() {
      var attr = {};
      attr.id = $scope.newPerson.id;
      attr.first_name = $scope.newPerson.first_name;
      attr.last_name = $scope.newPerson.last_name;
    };

    $scope.matchedPerson = function (person) {
      $scope.newPerson.id =  person.id;
      $scope.newPerson.first_name = person.first_name;
      $scope.newPerson.last_name = person.last_name;
    };

    $http.get('api/v1/organizations/' + $stateParams.organization_Id + '/people' ).
      success(function(data, status, headers, config) {
        $scope.organization_people = data;

      }).
      error(function(data, status, headers, config) {
        console.log(data)
      });










  });
