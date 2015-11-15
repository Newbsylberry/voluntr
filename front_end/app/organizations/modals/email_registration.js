'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('EmailRegistrationCtrl', function ($scope, $modalInstance, $http) {

    $scope.registerOrganization = function(){
      var attr = {};
      attr.organization = {};
      attr.organization.name = $scope.register.organization_name;
      attr.user_email = $scope.register.user_email;
      $http({
        method: 'post',
        url: '/api/v1/organizations/create/with_email/',
        data: attr
      }).then(function(organization){
        console.log(organization)
      })
    };



  });
