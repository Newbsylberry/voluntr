'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingpageCtrl
 * @description
 * # LandingpageCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
    .controller('LandingPageCtrl', function ($scope, Facebook, Organization,
                                             $http, $state, Auth, $rootScope, $location,
                                             $window, $anchorScroll) {


    $scope.goToSection = function(section) {
      // set the location.hash to the id of
      // the element you wish to scroll to.



      $location.hash(section);

      $anchorScroll();
    };


    // Set the height and width
    $scope.window_height = window.innerHeight;
    $scope.window_width = window.innerWidth;

    $(window).resize(function(){
      $scope.$apply(function(){
        $scope.window_height = $window.innerHeight;
        $scope.window_width = $window.innerWidth;
      });
    });

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







    });
