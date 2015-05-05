'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('PersonDetailCtrl', function ($scope, Facebook, $http,
                                            $stateParams, id, People) {

    People.get({person_Id: id}, function(successResponse) {
      $scope.person = successResponse;

      $http.get('api/v1/people/' + successResponse.id + '/opportunities' ).
        success(function(data, status, headers, config) {

          $scope.person.opportunities = data;

        }).
        error(function(data, status, headers, config) {

        });

    });






  });
