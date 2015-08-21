/**
 * Created by chrismccarthy on 3/17/15.
 */
'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('OpportunityDetailCtrl', function ($scope, Facebook, $stateParams,
                                                 $http, $state, Opportunity, id,
                                                 PersonOpportunity, start_time, $modal,
                                                 $modalInstance, $cacheFactory, $timeout,
                                                 OpportunityRole) {

    var addToDashboard = function (instance) {
      $scope.instanceStatisticGraphConfig.series[0].data.push
      ([Date.parse(instance.end_time), Number(instance.instance_hours)]);
      $scope.instanceStatisticGraphConfig.series[1].data.push
      ([Date.parse(instance.end_time), Number(instance.instance_people_count)]);
    };

    var addToRolePieChart = function (role) {
      $scope.opportunityRolesChart.series[0].data.push
      ([role.name, role.total_recorded_hours]);
    };


    $scope.createOpportunityRole = function(opportunity_role) {
      var attr = {};
      attr.name = opportunity_role.name
      attr.opportunity_id = $scope.opportunity.id;
      attr.description = opportunity_role.description
      OpportunityRole.create(attr).$promise.then(function(success){
        $scope.opportunity.opportunity_roles.push(success)
        $scope.opportunity_role = undefined;
      })
    }

    $scope.deleteOpportunityRole = function(opportunity_role) {
      var index = $scope.opportunity.opportunity_roles.indexOf(opportunity_role);
      if (index > -1) {
        $scope.opportunity.opportunity_roles.splice(index, 1);
      }
      OpportunityRole.delete(opportunity_role.id)
      $scope.opportunity_role.name = "";
      $scope.opportunity_role.description = "";
    };

    $http.get('api/v1/opportunities/' + id, {params: {instance_date: new Date(start_time).getTime()}}).
      success(function(data, status, headers, config) {
        $scope.opportunity = data;
        Opportunity.instance_statistics(id, 'instance_statistics').$promise.then(function(instance_statistics) {
          angular.forEach(instance_statistics, addToDashboard)
        });

        Opportunity.volunteers(id, 'volunteers').$promise.then(function(volunteers) {
          $scope.opportunity.volunteers = volunteers;
        });

        Opportunity.roles(id, 'roles').$promise.then(function(roles) {
          $scope.opportunity.opportunity_roles = roles;
          angular.forEach($scope.opportunity.opportunity_roles, addToRolePieChart)
        });

        Opportunity.roles(id, 'recorded_hours').$promise.then(function(recorded_hours) {
          $scope.opportunity.recorded_hours = recorded_hours;
        });




        $cacheFactory.current_calendar = {};
        $cacheFactory.current_calendar.schedule = $scope.opportunity.ical;
        $cacheFactory.current_calendar.id = $scope.opportunity.id;
        $cacheFactory.current_calendar.type = 'Opportunity';
        $cacheFactory.current_calendar.start_time = new Date(parseInt($scope.opportunity.start_time))
        $cacheFactory.current_calendar.duration = $scope.opportunity.duration;
        //
        //$cacheFactory.opportunity = $scope.opportunity;
      })


    $scope.getArray = function() {
      var volunteers = []
      angular.forEach($scope.opportunity.volunteers, function(volunteer) {
        var v = {}
        v.first_name = volunteer.first_name;
        v.last_name = volunteer.last_name;
        v.email_address = volunteer.email;
        v.hours = volunteer.opportunity_hours;
        volunteers.push(v)
      })
      return volunteers
    };


    var series = []

    var addDataToSeries = function(chart_series) {
      series.push(chart_series)
    };

    $scope.exportReport = function() {
      angular.forEach($scope.instanceStatisticGraphConfig.series, addDataToSeries)
      var optionsJSON = {
        title: {
          text: "Opportunity Dashboard"
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Date'
          }},
        "series": series
      };
      var optionsStr = JSON.stringify(optionsJSON)
      var dataString = 'async=false&type=png&width=300&options=' + encodeoptionsStr;

      $http.get('api/v1/reports/opportunities/' + id, {params:{url: dataString}}).success(function(data){console.log(data)});
    };

    $http.get('api/v1/organizations/' + $stateParams.organization_Id + '/people' ).
      success(function(data, status, headers, config) {

        $scope.organization_people = data;
      }).
      error(function(data, status, headers, config) {
        console.log(data)
      });


    $scope.addOpportunityPersonModal = function (size, person) {
      var addOpportunityPersonModal = $modal.open(
        {
          templateUrl: 'organizations/modals/add_opportunity_person.html',
          controller: 'AddOpportunityPersonCtrl',
          windowClass: 'add-event-modal-window',
          size: size,
          resolve:
          {
            person: function() {
              return person;
            },
            opportunity: function(){
              return $scope.opportunity;
            },
            start_time: function(){
              return start_time;
            }
          }
        });

      addOpportunityPersonModal.result.then(function () {

        },
        function () {

          console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.registerFormPreview = function (size, opportunity) {
      var registerFormPreview = $modal.open(
        {
          templateUrl: 'organizations/opportunities/registration_form.html',
          controller: 'OpportunityRegistrationCtrl',
          windowClass: 'add-event-modal-window',
          size: size
          //resolve: {
          //  opportunity: function() {
          //    return opportunity
          //  }
          //}
        });

      registerFormPreview.result.then(function () {

        },
        function () {

          console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.signInFormPreview = function (size, opportunity) {
      var signInFormPreview = $modal.open(
        {
          templateUrl: 'organizations/opportunities/sign_in_form.html',
          controller: 'OpportunitySignInCtrl',
          windowClass: 'add-event-modal-window',
          size: size
          //resolve: {
          //  opportunity: opportunity
          //}
        });

      signInFormPreview.result.then(function () {

        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.instanceStatisticGraphConfig = {
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
        //plotLines: [{
        //  value: 0,
        //  width: 1,
        //  color: '#808080'
        //}]
      },
      series: [
        {
          name: 'Recorded Hours',
          data: []
        },
        {
          name: 'People Recording',
          data: []

        }
      ],
      title: {
        text: "Opportunity Dashboard"
      },
      loading: false,
      size: {
        height: "250"
      }
    };

    $scope.opportunityRolesChart = {
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
        text: "Opportunity Roles Distribution"
      },
      loading: false,
      size: {
        height: "250"
      }
    };

    $timeout(function(){window.dispatchEvent(new Event('resize')), 50})



  });
