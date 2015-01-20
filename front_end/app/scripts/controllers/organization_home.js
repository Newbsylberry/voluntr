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
                                                $stateParams, $state, Event,
                                                $http, $filter, $parse, $modal,
                                                $rootScope) {


    $scope.addOrganizationEvent = function (size) {
      var organizationEventModal = $modal.open(
        {
          templateUrl: 'views/organization_add_event.html',
          controller: 'AddEventCtrl',
          windowClass: 'add-event-modal-window',
          size: size
        })

      organizationEventModal.result.then(function () {

        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    };

    var addPostToGraph = function (post) {
      if (post.likes) {
        $scope.lineGraphConfig.series[0].data.push
        ([post.created_time, post.likes.data.length])

     //   $scope.lineGraphConfig.xAxis.categories.push($filter('date')(post.created_time, ' MMM dd '))
      } else if (!post.likes) {
        $scope.lineGraphConfig.series[0].data.push([post.created_time, 0])
    //    $scope.lineGraphConfig.xAxis.categories.push($filter('date')(post.created_time, ' MMM dd '))
      }

    }




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
            Facebook.api('/' + successResponse.fb_id + '/posts', function(response) {
              angular.forEach(response.data, function(org_post) {
                var post = {};
                post = org_post;
                post.liking_users = [];
                post.created_time = Date.parse(org_post.created_time);
                Facebook.api('/' + post.id + '/likes', function(response) {
                  angular.forEach(response.data, function(liking_user) {
                    post.liking_users.push(liking_user)
                    post.likes = response.data.length;
                  })
                });
                $scope.organization.posts.push(post);
              });

              $scope.organization.posts = $filter('orderBy')($scope.organization.posts, 'created_time');
              angular.forEach($scope.organization.posts, addPostToGraph);

            });
            Facebook.api('/' + successResponse.fb_id + '/tagged', function(response) {
            });

            $scope.organization = response;
            $scope.organization.posts = [];
            $scope.organization.events = successResponse.events;
            console.log($scope.organization)
            Facebook.api('/' + successResponse.fb_id + '/photos', function(response) {

              $scope.organization.picture = response.data[0];



            });
          });
        })
      }

      // If not connected then take them back to the first page
      else if (response.status !== 'connected') {
        $state.go('landing_page.initial_page')
      }
    });

    $scope.generated_stories = ""
    // Function that manages the post modal in the side bar
    $scope.open = function (size) {
      var addDataModal = $modal.open(
        {
          templateUrl: 'views/add_additional_data.html',
          controller: 'AddDataCtrl',
          // windowClass: 'create-profile-modal-window',
          size: size,
          resolve:{

            // Example using function with simple return value.
            // Since it's not a promise, it resolves immediately.
            organization:  function(){
              return $scope.organization;
            }

          }});

      addDataModal.result.then(function () {
        },
        function () {
          console.log('Modal dismissed at: ' + new Date());

          console.log($scope.generated_stories);
        });
    };

    $scope.user_stories = false;

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


    $rootScope.lineGraphConfig = {
      options: {
        chart: {
          type: 'spline',
          zoomType: "xy"
        }
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        allowDecimals: false,
        floor: 0,
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      series: [{
        name: 'Post Likes',
        data: []
      }],
      title: {
        text: "Your Organization's Posts"
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

