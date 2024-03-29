'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:AddeventcontrollerCtrl
 * @description
 * # AddeventcontrollerCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('AddFacebookOrganization', function ($scope,$stateParams,$modalInstance,
                                        $state,organization,Organization,user,$localStorage,token) {

    console.log(user)
    $scope.addOrganization = function() {
      $scope.organization = organization;
      var attr = {};
      attr.fb_id = organization.id;
      attr.first_name = user.first_name;
      attr.u_fb_id = user.id;
      attr.email = user.email;
      attr.last_name = user.last_name;
      attr.name = organization.name;
      attr.organization_type_name = $scope.organization_type_name;
      attr.description = organization.description;
      attr.oauth_key = token;
      var newOrganization = Organization.create(attr).$promise.then(function(data){
        $localStorage.token = data.token;
        $modalInstance.close();
        $state.go('organizations.tutorial.1', {organization_Id:data.organization.id})
        $stateParams.organization_Id = data.id;
      });
    };
  });
