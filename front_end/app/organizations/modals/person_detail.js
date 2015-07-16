'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('PersonDetailCtrl', function ($scope, Facebook, $http,
                                            $stateParams, id, People, $timeout) {

    var addRecordedHoursToDash = function (recorded_hour) {

      if (recorded_hour.date_recorded != null) {
       $scope.personStatisticGraphConfig.series[0].data.push
       ([Date.parse(recorded_hour.date_recorded), recorded_hour.hours])
       }
    };

    var addToPersonOpportunitiesChart = function (person_opportunity) {
      console.log(person_opportunity)
      $scope.personOpportunitiesChart.series[0].data.push
      ([person_opportunity.opportunity.name, person_opportunity.total_hours]);
    };

    People.get({person_Id: id}, function(successResponse) {
      $scope.person = successResponse;

      People.recorded_hours(id, 'recorded_hours').$promise.then(function(recorded_hours) {
        $scope.person.recorded_hours = recorded_hours;
        angular.forEach(recorded_hours, addRecordedHoursToDash)
      });

      People.opportunities(id, 'opportunities').$promise.then(function(opportunities) {
        $scope.person.opportunities = opportunities;

        angular.forEach($scope.person.opportunities, addToPersonOpportunitiesChart)
      });
    });


    $scope.personStatisticGraphConfig =
    {
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
        text: "Person Dashboard"
      },
      loading: false,
      size: {
        height: "250"
      }
    };

    $scope.personOpportunitiesChart = {
      options: {
        chart: {
          type: 'pie',
          zoomType: "xy"
        }
      },
      series: [
        {
          name: 'Recorded Hours',
          data: []
        }
      ],
      title: {
        text: "Person Opportunities Distribution"
      },
      loading: false,
      size: {
        height: "250"
      }
    };

    $timeout(function(){window.dispatchEvent(new Event('resize')), 250})





  });
