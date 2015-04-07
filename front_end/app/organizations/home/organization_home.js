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
                                                $stateParams, $state, Opportunity,
                                                $http, $filter, $parse, $modal,
                                                $rootScope) {







    var addPostToGraph = function (post) {

      $scope.lineGraphConfig.series[0].data.push
      ([Date.parse(post.post_time), Number(post.likes)])
      console.log($scope.lineGraphConfig.series[0].data[200])
    };

    var addDailyStatisticsToGraph = function(day){
      console.log((Date.parse(day.date)))
      $scope.lineGraphConfig.series[1].data.push
      ([Date.parse(day.date), Number(day.total_recorded_hours)])
      $scope.lineGraphConfig.series[2].data.push
      ([Date.parse(day.date), Number(day.planned_hours)])
      $scope.lineGraphConfig.series[3].data.push
      ([Date.parse(day.date), Number(day.total_added_volunteers)])
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
          console.log(successResponse)
          // find the organizations information on facebook
          $scope.organization = successResponse
          $rootScope.organization_id = successResponse.id;
          $scope.organization.posts = $filter('orderBy')(successResponse.posts, 'post_time')
          angular.forEach($scope.organization.posts, addPostToGraph)
          $http.get('api/v1/organizations/' + successResponse.id + '/recorded_hours').
            success(function(data, status, headers, config) {
              $scope.organization.recorded_hours = data;
            }).
            error(function(data, status, headers, config) {
              console.log(data)
            });
          $http.get('api/v1/organizations/' + successResponse.id + '/daily_statistics').
            success(function(data, status, headers, config) {
              console.log(data)
              $scope.organization.daily_statistics = $filter('orderBy')(data, 'date')
              angular.forEach($scope.organization.daily_statistics, addDailyStatisticsToGraph)
            }).
            error(function(data, status, headers, config) {
              console.log(data)
            });
          $http.get('api/v1/organizations/' + successResponse.id + '/contact_volunteers').
            success(function(data, status, headers, config) {
              $scope.organization.contact_volunteers = data;
              console.log($scope.organization.contact_volunteers)
            }).
            error(function(data, status, headers, config) {
              console.log(data)
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

    $scope.addEventToGraph = function(event, index) {
      console.log(index)
      if (!event.graph_active) {
        console.log(event)
        var plotLine = {};
        plotLine.color = 'red';
        plotLine.dashStyle = 'longdashdot';
        plotLine.value = Date.parse(event.start_time);
        plotLine.width = 3;
        plotLine.label = {};
        plotLine.label.text = event.name;
        $rootScope.lineGraphConfig.xAxis.plotLines.push(plotLine);
        event.plot_line_index = $rootScope.lineGraphConfig.xAxis.plotLines.indexOf(plotLine);
        var newDataPoint = [];
        newDataPoint[0] = Date.parse(event.start_time) + 604800000;
        newDataPoint[1] = null;
        $rootScope.lineGraphConfig.series[0].data.push(newDataPoint);
        event.event_data_point_index = $rootScope.lineGraphConfig.series[0].data.indexOf(newDataPoint);
        $scope.organization.posts[index] = event;
        console.log(event.event_data_point);
      } else if (event.graph_active) {
        if (index > - 1) {
          $rootScope.lineGraphConfig.xAxis.plotLines.splice(event.plotLineIndex, 1)
          $rootScope.lineGraphConfig.series[0].data.splice(event.event_data_point_index, 1)
        }
      };
    };


    $rootScope.lineGraphConfig = {
      options: {
        chart: {
          type: 'spline',
          zoomType: "xy"
        }
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        allowDecimals: false,
        floor: 0
        //plotLines: [{
        //  value: 0,
        //  width: 1,
        //  color: '#808080'
        //}]
      },
      series: [
        {
          name: 'Post Likes',
          data: []
        },
        {
          name: 'Total Recorded Volunteer Hours',
          data: []

        },
        {
          name: 'Total Planned Volunteer Hours',
          data: []

        },
        {
          name: 'Total Added Volunteers',
          data: []

        }
      ],
      title: {
        text: "Your Organization's Posts"
      },
      loading: false,
      size: {
        height: "350"
      }
    };



  });

