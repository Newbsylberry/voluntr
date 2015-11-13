'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('EmailRegistrationCtrl', function ($scope, $modalInstance) {

    $scope.registerOrganization = function(){
      var attr = {};
      attr.organization_name = $scope.register.organization_name;
      attr.email = $scope.register.user_email;
    }



  });
