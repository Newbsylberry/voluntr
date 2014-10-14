'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingpageCtrl
 * @description
 * # LandingpageCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')

    .controller('LandingPageCtrl', function ($scope, Facebook, Organization, $http) {

//        var findPageEvent = function(page_event) {
//            var insertIntoScope = function(event) {
//                var events = [];
//                $scope.events = events;
//                $scope.events.push(event);
//            }
//            Facebook.api("/" + page_event.id + "/events", function (response) {
//              angular.forEach(response.data, insertIntoScope)
//            });
//        };

        var listOrganization = function(organization) {
            if (!$scope.organizations) {
            var organizations = [];
            $scope.organizations = organizations;
            };
            $http({method: 'GET',
                url: '/api/v1/existence_check/' + organization.id}).
                success(function(data, status, headers, config) {
                    if (data.fb_id) {
                    organization.exists = true
                    organization.v_id = data.id;
                    } else if (!data.fb_id) {
                        organization.exists = false
                    }
                }).
                error(function(data, status, headers, config) {
                    console.log(data);
                })
            $scope.organizations.push(organization)
            console.log($scope.organizations)
        };



            Facebook.getLoginStatus(function(response) {
                if(response.status === 'connected') {
                    $scope.facebook_token = response.authResponse.accessToken;
                    Facebook.api('/me/accounts', function(response) {
                        angular.forEach(response.data, listOrganization)
                    });
                    Facebook.api('/me/groups', function(response) {
                        console.log(response)
                        angular.forEach(response.data, listOrganization)
                    });
                };
                });

                $scope.organizationLogIn = function () {
                    Facebook.login(function(response) {
                            Facebook.api('/me/accounts', function(response) {
                            $scope.facebook_token = response.authResponse.accessToken;
                        });
                            // Do something with response.
                        }, {scope: ['manage_pages', 'user_groups']}
                    );
                };


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

        $scope.logout = function() {
            $scope.facebook_token = null;
        }




    });
