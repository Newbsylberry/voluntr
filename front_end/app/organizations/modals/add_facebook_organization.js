'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:AddeventcontrollerCtrl
 * @description
 * # AddeventcontrollerCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('AddFacebookOrganization', function ($scope, $stateParams, $modalInstance,
                                        $state, organization, Organization, $localStorage) {

    $scope.addOrganization = function() {
      $scope.organization = organization;
      var attr = {};
      attr.fb_id = organization.id;
      attr.name = organization.name;
      attr.organization_type_name = $scope.organization_type_name;
      attr.description = organization.description;
      attr.oauth_key = $scope.oauth_key;
      var newOrganization = Organization.create(attr).$promise.then(function(data){
        $localStorage.token = data.token;
        $state.go('organizations.tutorial.1', {organization_Id:data.organization.id})
        $stateParams.organization_Id = data.id;
      });
    };
  });
