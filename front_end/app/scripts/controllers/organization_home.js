'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:OrganizationHomeCtrl
 * @description
 * # OrganizationHomeCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
    .controller('OrganizationHomeCtrl', function ($scope, Facebook, Organization, $stateParams, $state, Event) {

        var addEvents = function(event) {
            if (!$scope.events) {
                var events = [];
                $scope.events = events;
            };
            Facebook.api('/' + event.id, function(response) {
                $scope.events.push(response);
                console.log($scope.events)
            })
        };



        Facebook.getLoginStatus(function(response) {
            if(response.status === 'connected') {
                Organization.get({organization_Id: $stateParams.organization_Id}, function(successResponse) {

                    Facebook.api('/' + successResponse.fb_id, function(response) {
                        console.log(response)
                        $scope.organization = response;
                        $scope.$on('mapInitialized', function(event, map) {
                            map.setCenter("response.location.latitude, response.location.longitude")

                        });
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

        $scope.addEvent = function(event) {
            var attr = {};
            attr.fb_id = event.id;
            attr.name = event.name;
            attr.location = event.location;
            attr.description = event.description;
            attr.latitude = event.venue.latitude;
            attr.longitude = event.venue.longitude;
            attr.start_time = event.start_time;
            attr.end_time = event.end_time;
            attr.timezone = event.timezone;
        var newEvent = Event.create(attr);
        };

    });

