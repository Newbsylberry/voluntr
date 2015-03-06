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
        console.log($scope.oauth_key)
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
      $http.get('/api/v1/organizations/existence_check/' + organization.id).
        success(function(data, status, headers, config) {
          if (data) {
            organization.exists = true
            organization.v_id = data.id;
          } else if (!data) {
            organization.exists = false
          }
        }).
        error(function(data, status, headers, config) {
        })
      $scope.organizations.push(organization)
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

    $scope.$watch('connected_to_facebook', function () {
      if ($scope.connected_to_facebook && !$scope.organizations){
        Facebook.api('/me/accounts', function (response) {
          console.log(response)
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
      attr.initial_likes = organization.likes;
      attr.initial_talking_about
      var newOrganization =
        $http.post('/api/v1/organizations/',
          {
            "organization": {
              name: attr.name,
              fb_id: attr.fb_id,
              description: attr.description
            },
            "oauth_key": $scope.oauth_key
          }).
          success(function(data, status, headers, config) {
              $state.go('organizations.organization_home', {organization_Id:data.id})
          }).
          error(function(data, status, headers, config) {
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
