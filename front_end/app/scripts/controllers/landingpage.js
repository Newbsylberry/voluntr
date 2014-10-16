'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingpageCtrl
 * @description
 * # LandingpageCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')

    .controller('LandingPageCtrl', function ($scope, Facebook, Organization, $http, $state) {

        $scope.organizationLogIn = function () {
            Facebook.getLoginStatus(function(response) {
                if(response.status === 'connected') {
                    $scope.facebook_token = response.authResponse.accessToken;
                    $state.go('landing_page.organization_landing')
                }
                else if (response.status !== 'connected') {
                    Facebook.login(function(response) {
                            Facebook.api('/me/accounts', function(response) {
                                $scope.facebook_token = response.authResponse.accessToken;
                            });
                            // Do something with response.
                        }, {scope: ['manage_pages', 'user_groups']}
                    );
                    $state.go('landing_page.organization_landing')
                };
            });
            console.log($scope.organizations)

        };




        $scope.logout = function() {
            $scope.facebook_token = null;
        }




    });
