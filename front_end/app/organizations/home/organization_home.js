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
    };

    var addDailyStatisticsToGraph = function(day){
      $scope.lineGraphConfig.series[1].data.push
      ([Date.parse(day.date), Number(day.total_recorded_hours)])
      $scope.lineGraphConfig.series[2].data.push
      ([Date.parse(day.date), Number(day.planned_hours)])
      $scope.lineGraphConfig.series[3].data.push
      ([Date.parse(day.date), Number(day.total_added_volunteers)])
    };


    $scope.loaded = false;
    // Get the status of the users facebook account,
    // if it's connected, than retrieve the organization
    // from the database and use it's fb_id to get
    // information from facebook and see organizations
    // events and check whether they exist in the database
    // Get the organization from the volu database
    Organization.get({
      organization_Id: $stateParams.organization_Id,
    }, function (successResponse) {

      // DO FB STUFF HERE
      if (successResponse.fb_id) {
        Facebook.getLoginStatus(function (response) {
          if (response.status === 'connected') {

          }
        });
      }
      // find the organizations information on facebook
      $scope.organization = successResponse
      Organization.recorded_hours(successResponse.id, 'recently_recorded_hours').$promise.then(function (recorded_hours) {
        $scope.organization.recorded_hours = recorded_hours;
      });
      Organization.daily_statistics(successResponse.id, 'daily_statistics').$promise.then(function (data) {
        $scope.organization.daily_statistics = $filter('orderBy')(data, 'date')
        angular.forEach($scope.organization.daily_statistics, addDailyStatisticsToGraph)
      })
      Organization.contact_volunteers(successResponse.id, 'contact_volunteers').$promise.then(function (data) {
        $scope.organization.contact_volunteers = data;
      })
      Organization.posts(successResponse.id, 'posts').$promise.then(function (data) {
        $scope.organization.posts = $scope.organization.posts = $filter('orderBy')(data, 'post_time');
        angular.forEach($scope.organization.posts, addPostToGraph)
      })
    }).$promise.then(function(){
        $scope.loaded = true;
      })






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
        text: "Your Organization's Timeline"
      },
      loading: false,
      size: {
        height: "250"
      }
    };

  });

