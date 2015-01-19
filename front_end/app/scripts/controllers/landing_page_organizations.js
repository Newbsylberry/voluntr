'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('LandingPageOrganizationsCtrl', function ($scope, Facebook, $http, Organization) {

    $scope.log_in = function () {
      Facebook.login(function(response) {

      }, {scope: 'user_groups,read_insights,manage_pages'})
    };


    var listOrganization = function(organization) {
      if (!$scope.organizations) {
        var organizations = [];
        $scope.organizations = organizations;
      };
      $http({method: 'GET',
        url: '/api/v1/organizations/existence_check/' + organization.id}).
        success(function(data, status, headers, config) {
          console.log(data)
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
        Facebook.api('/me/accounts', function(response) {
          angular.forEach(response.data, listOrganization)
        })} else if (response.status !== 'connected') {
          $scope.connected_to_facebook = false;
        }
    })

    $scope.addOrganization = function(organization) {
      $scope.organization = organization;
      var attr = {};
      attr.fb_id = organization.id;
      attr.name = organization.name;
      attr.about = organization.about;
      attr.initial_likes = organization.likes;
      attr.initial_talking_about
      var newOrganization = Organization.create(attr)
      newOrganization.$promise.then(function(data) {
        $scope.organization.v_id = data.id;
        $scope.organization.exists = true;
      })
    };
  });
