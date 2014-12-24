'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:OrganizationHomeCtrl
 * @description
 * # OrganizationHomeCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
    .controller('OrganizationHomeCtrl', function ($scope, Facebook, Organization,
                                                  $stateParams, $state, Event, $http) {

        var addEvents = function(event) {
            if (!$scope.events) {
                var events = [];
                $scope.events = events;
            };
            Facebook.api('/' + event.id, function(response) {
                event = response;
                $http({method: 'GET',
                    url: '/api/v1/events/existence_check/' + event.id}).
                    success(function(data, status, headers, config) {
                        if (data.fb_id) {
                            event.exists = true;
                            event.v_id = data.id;
                        } else if (!data.fb_id) {
                            event.exists = false
                        }
                        $scope.events.push(event);
                        console.log($scope.events)
                    }).
                    error(function(data, status, headers, config) {
                    })

            })

        };


        // Get the status of the users facebook account,
        // if it's connected, than retrieve the organization
        // from the database and use it's fb_id to get
        // information from facebook and see organizations
        // events and check whether they exist in the database
        Facebook.getLoginStatus(function(response) {
            if(response.status === 'connected') {

                // Get the organization from the volu database
                Organization.get({organization_Id: $stateParams.organization_Id}, function(successResponse) {

                    // find the organizations information on facebook
                    Facebook.api('/' + successResponse.fb_id, function(response) {
                        $scope.organization = response;
                        Facebook.api('/' + successResponse.fb_id + '/photos', function(response) {
                          $scope.organization.picture = response.data[0];
                          console.log($scope.organization)
                          Facebook.api('/' + successResponse.fb_id + '/posts', function(response) {
                            console.log(response)
                          });
                          Facebook.api('/' + successResponse.fb_id + '/tagged', function(response) {
                            console.log(response)
                          });
                        });
                    });


                    // Fetch the organizations events
                    Facebook.api('/' + successResponse.fb_id + '/events', function (response) {
                        angular.forEach(response.data, addEvents)
                    })
                })
            }

            // If not connected then take them back to the first page
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
            attr.organization_id = $stateParams.organization_Id;
            var newEvent = Event.create(attr);
            $scope.event.exists;
            console.log($scope.event);
        };


        $scope.lineGraphConfig = {
            options: {
                chart: {
                    type: 'line'
                }
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            series: [{
                name: 'Facebook Likes',
                data: [1, 4, 12, 16, 45, 100, 125, 126, 140, 150, 200, 250]
            }, {
                name: 'Recorded Hours',
                data: [45, 80, 75, 60, 120, 125, 25, 200, 15, 20, 200, 25]
            }],
            title: {
                text: "Your Organization's Information"
            },
            loading: false,
            size: {
                height: "350"
            }
        };

        $scope.pieChartConfig = {
            options: {
                chart: {
                    type: 'pie'
                }
            },
            series: [{
                name: 'Attending Events',
                data: [['Under 18', 10], ['18-24', 25],
                ['24-34', 30], ['34-44', 15], ['44-60', 10],
                ['60+', 10]]
            }],
            title: {
                text: "Demographic of Volunteers"
            },
            loading: false,
            size: {
                height: "250"
            }
        };

        $scope.barChartConfig = {
            options: {
                chart: {
                    type: 'bar'
                }
            },
            xAxis: {
                categories: ['Event 1', 'Event 2', 'Event 3']
            },
            series: [{
                name: 'Attending Facebook Event',
                data: [200, 250, 300]
            }, {
                name: 'Recorded Hours',
                data: [45, 80, 120]
            }, {
                name: 'Fund Raising',
                data: [450, 600, 1000]
            }],
            title: {
                text: "Past Events Information"
            },
            loading: false,
            size: {
                height: "250"
            }
        };

    });

