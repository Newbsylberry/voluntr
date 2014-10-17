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
                                             $http, $state, Auth, $rootScope) {

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


        $scope.newVolunteer = function () {
            var credentials = {};
            credentials.email = $scope.newVolunteer.email; // credentials.email equals $scope.newUser.email
            credentials.password = $scope.newVolunteer.password; // see above
            credentials.passwordConfirmation = $scope.newVolunteer.passwordConfirmation; // see above
            Auth.register(credentials).then(function(object){ //credentials are passed to Auth, which speaks with the devise gem in rails
                console.log(object)
                $rootScope.user = object.user;
                //when a new user is created assign data to both local and session storage
                localStorage.token = object.token;
                localStorage.user_id = object.user.id;
                $state.go('volunteer_home', {user_Id:object.user.id})
            })
        }

        $scope.logIn = function () {
            var attr = {};
            attr.email = $scope.logIn.email;
            attr.password = $scope.logIn.password;
            Auth.login(attr).then(function(object) {
                $rootScope.user = object.user;
                localStorage.user_id = object.user.id;
                localStorage.token = object.token
                $state.go('volunteer_home', {user_Id:object.user.id});
            })
        };




    });
