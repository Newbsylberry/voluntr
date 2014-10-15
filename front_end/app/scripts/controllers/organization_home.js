'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:OrganizationHomeCtrl
 * @description
 * # OrganizationHomeCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
    .controller('OrganizationHomeCtrl', function ($scope, Facebook, Organization, $stateParams, $state) {

        var addEvents = function(event) {
            console.log(event)
            if (!$scope.events) {
                var events = [];
                $scope.events = events;
            };
            $scope.events.push(event);
        };



        Facebook.getLoginStatus(function(response) {
            if(response.status === 'connected') {
                Organization.get({organization_Id: $stateParams.organization_Id}, function(successResponse) {

                    Facebook.api('/' + successResponse.fb_id, function(response) {
                        console.log(response)
                        $scope.organization = response;
                    });
                    Facebook.api('/' + successResponse.fb_id + '/events', function (response) {
                        angular.forEach(response.data, addEvents)
                    })
                })
            }
            else if (response.status !== 'connected') {
                $state.go('landing_page.initial_page')
            }
        });
    });

