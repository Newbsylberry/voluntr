'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('OrganizationRegistrationCtrl', function ($scope, Facebook, $http, Organization,
                                                        $state, $stateParams) {

    $scope.log_in = function () {
      Facebook.login(function(response) {
        $scope.connected_to_facebook = true;
        $scope.oauth_key = response.authResponse.accessToken;
      }, {scope: 'user_groups,read_insights,manage_pages'})
    };


    var listOrganization = function(organization) {
      if (!$scope.organizations) {
        var organizations = [];
        $scope.organizations = organizations;
      };
      Facebook.api('/' + organization.id + '/picture', {"type": "large"}, function (response) {
        organization.picture = response.data.url;
      });

      Organization.existence_check(organization.id).$promise.then(function(data) {
        if (data.id) {
          console.log(data)
          organization.exists = true;
          organization.v_id = data.id;
        } else if (!data.id) {
          organization.exists = false;
        }
        $scope.organizations.push(organization)
      });

    };

    Facebook.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        $scope.connected_to_facebook = true;
        $scope.oauth_key = response.authResponse.accessToken;
        console.log($scope.oauth_key);
      } else if (response.status !== 'connected') {
        $scope.connected_to_facebook = false;
      }
    });

    // Write authorization method here, needs to send oauth key and organization id to server
    $scope.authorizeUser = function(organization) {
      Organization.authorization($scope.oauth_key, organization.v_id).$promise.then(function(data) {
        console.log(data)
        localStorage.token = data.token;
        $state.go('organizations.organization_home', {organization_Id:data.organization.id})
      })
    };

    $scope.$watch('connected_to_facebook', function () {
      if ($scope.connected_to_facebook && !$scope.organizations){
        Facebook.api('/me/accounts', function (response) {
          angular.forEach(response.data, listOrganization)
        });
      }
    });


    $scope.addOrganization = function(organization) {
      $scope.organization = organization;
      var attr = {};
      attr.fb_id = organization.id;
      attr.name = organization.name;
      attr.description = organization.description;
      attr.oauth_key = $scope.oauth_key;
      var newOrganization = Organization.create(attr).$promise.then(function(data){
        localStorage.token = data.token;
        $state.go('organizations.organization_home', {organization_Id:data.organization.id})
        $stateParams.organization_Id = data.id;
      });
    };

    $scope.organizationRegistration = function (organization) {
      $scope.organization_registration = true;
      Facebook.api('/' + organization.id, function (response) {
        organization.description = response.description;

      });
      $scope.organization = organization;

    };

    $scope.organizationList = function () {
      $scope.organization_registration = false;
    };

  });
