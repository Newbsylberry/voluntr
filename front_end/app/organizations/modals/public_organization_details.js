'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('OrganizationDetailCtrl', function ($scope, url, Organization, $timeout,$filter,$modal,$stateParams) {


    var addDailyStatisticsToGraph = function(day){
      $scope.opportunityGraphConfig.series[0].data.push
      ([Date.parse(day.date), Number(day.total_recorded_hours)])
      //$scope.lineGraphConfig.series[2].data.push
      //([Date.parse(day.date), Number(day.planned_hours)])
      $scope.opportunityGraphConfig.series[1].data.push
      ([Date.parse(day.date), Number(day.total_added_volunteers)])
    };

    Organization.get({organization_Id: $stateParams.organization_Id}, function(successResponse){
      if (successResponse.users.length > 0) {
        $scope.contact_by_email = true;
      } else if (successResponse.users.length === 0) {
        $scope.contact_by_email = false;
      }
      console.log($scope.contact_by_email)
    })

    Organization.get_by_url({organization_custom_Url: url}, function(successResponse) {
      $scope.organization = successResponse;
      console.log($scope.organization)
      Organization.daily_statistics(successResponse.id, 'daily_statistics').$promise.then(function (data) {
        $scope.organization.daily_statistics = $filter('orderBy')(data, 'date')
        angular.forEach($scope.organization.daily_statistics, addDailyStatisticsToGraph)
      })
      Organization.public_opportunities(successResponse.id, 'public_opportunities').$promise.then(function (data) {
        $scope.organization.public_opportunities = data;
      })
      Organization.summary_statistics(successResponse.id, 'summary_statistics').$promise.then(function (data) {
        $scope.organization.statistics = data;
        if (!$scope.organization.statistics.average_hours_recorded) {
          $scope.organization.statistics.average_hours_recorded = 0;
        }
      })
    });

    $scope.contactOrganization = function(){
      var contactOrganizationModal = $modal.open(
        {
          templateUrl: 'organizations/modals/contact_organization.html',
          controller: 'ContactOrganizationModal',
          windowClass: 'contact-organization-modal',
          size: 'md',
          resolve: {
            organization: function () {
              return $scope.organization;
            }
          }
        });
        contactOrganizationModal.result.then(function () {

        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    }


    $scope.opportunityGraphConfig = {
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
          name: 'Total Recorded Volunteer Hours',
          data: []

        },
        {
          name: 'Total Added Volunteers',
          data: []

        }
      ],
      title: {
        text: "Organization Statistics"
      },
      loading: false,
      size: {
        height: "200"
      }
    }

    $timeout(function(){window.dispatchEvent(new Event('resize')), 50})

  });
