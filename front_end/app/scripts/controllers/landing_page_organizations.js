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
        var listOrganization = function(organization) {
            if (!$scope.organizations) {
                var organizations = [];
                $scope.organizations = organizations;
            };
            $http({method: 'GET',
                url: '/api/v1/organizations/existence_check/' + organization.id}).
                success(function(data, status, headers, config) {
                    if (data.fb_id) {
                        organization.exists = true
                        organization.v_id = data.id;
                    } else if (!data.fb_id) {
                        organization.exists = false
                    }
                }).
                error(function(data, status, headers, config) {
                })
            $scope.organizations.push(organization)

        };

        Facebook.getLoginStatus(function(response) {
            if(response.status === 'connected') {
                Facebook.api('/me/accounts', function(response) {
                    angular.forEach(response.data, listOrganization)
                });
//                Facebook.api('/me/groups', function(response) {
//                    angular.forEach(response.data, listOrganization)
//                });
            }
        })

        $scope.addOrganization = function(organization) {
            $scope.organization = organization;
            var attr = {};
            attr.fb_id = organization.id;
            var newOrganization = Organization.create(attr)
            newOrganization.$promise.then(function(data) {
                $scope.organization.v_id = data.id;
                $scope.organization.exists = true;
            })
        };
    });
