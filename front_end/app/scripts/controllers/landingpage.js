'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingpageCtrl
 * @description
 * # LandingpageCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')

    .controller('LandingPageCtrl', function ($scope, Facebook) {

        var findPageEvent = function(page_event) {
            var insertIntoScope = function(event) {
                var events = [];
                $scope.events = events;
                $scope.events.push(event);
            }
            Facebook.api("/" + page_event.id + "/events", function (response) {
              angular.forEach(response.data, insertIntoScope)
            });
        };

        Facebook.getLoginStatus(function(response) {
            if(response.status === 'connected') {
                $scope.token = response.authResponse.accessToken;
                Facebook.api('/me/accounts', function(response) {
                    angular.forEach(response.data, findPageEvent)

                });
            } else if (response.status !== 'connected'){
                Facebook.login(function(response) {                Facebook.api('/me/accounts', function(response) {
                        $scope.token = response.authResponse.accessToken;
                    });
                       // Do something with response.
                }, {scope: 'manage_pages'}
                );
            }
        });

        $scope.me = function() {
            Facebook.api('/me', function(response) {

            });
        };




    });
