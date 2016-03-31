'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('CreateOrganizationModal', function ($scope, Organization, $stateParams,
                                                   $mdDialog,$state,$localStorage) {


    $scope.organization = {};
  $scope.createOrganization = function(){
    var attr = {};
    attr.name = $scope.organization.name;
    attr.organization_type_name = $scope.organization.organization_type_name;
    attr.address_1 = $scope.organization.address;
    attr.address_2 = $scope.organization.address2;
    attr.city = $scope.organization.city;
    attr.state = $scope.organization.state;
    attr.zip_code = $scope.organization.postalCode;
    Organization.create_with_email(attr).$promise.then(function(response){
      $localStorage.token = response.token;
      $state.go('organizations.tutorial.1', {organization_Id:response.organization.id})
    })
    $mdDialog.cancel();
  };

    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      })

  });
