'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('GroupDetailCtrl', function ($scope, id, Group, $timeout) {


    var addToDashboard = function (recorded_hour) {
      $scope.groupStatisticGraphConfig.series[0].data.push
      ([Date.parse(recorded_hour.date_recorded), Number(recorded_hour.hours)]);
    };

    Group.get({group_Id: id}, function(successResponse) {
      $scope.group = successResponse;
      Group.recorded_hours(successResponse.id, 'recorded_hours').$promise.then(function (recorded_hours) {
        $scope.group.recorded_hours = recorded_hours;
      });
      Group.people(successResponse.id, 'people').$promise.then(function(people) {
        $scope.group.people = people;
      });
      Group.opportunities(successResponse.id, 'opportunities').$promise.then(function(opportunities) {
        $scope.group.opportunities = opportunities;
      });
      angular.forEach(successResponse.recorded_hours, addToDashboard)
    });


    $scope.groupStatisticGraphConfig = {
      options: {
        chart: {
          type: 'spline',
          zoomType: "xy",
          renderTo: 'container'
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
      },
      series: [
        {
          name: 'Recorded Hours',
          data: []
        }
      ],
      title: {
        text: "Group Dashboard"
      },
      loading: false,
      size: {
        height: "250"
      }
    };

    $timeout(function(){window.dispatchEvent(new Event('resize')), 50})

  });
