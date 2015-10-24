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
                                                 OpportunityRole, opportunity) {


    $scope.instance = start_time;

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

    $scope.opportunity = opportunity.data;

    Opportunity.instance_statistics($scope.opportunity.id, 'instance_statistics').$promise.then(function(instance_statistics) {
      angular.forEach(instance_statistics, addToDashboard)
    });

    Opportunity.volunteers($scope.opportunity.id, 'volunteers').$promise.then(function(volunteers) {
      $scope.opportunity.volunteers = volunteers;
      console.log($scope.opportunity.volunteers)
    });

    Opportunity.roles($scope.opportunity.id, 'roles').$promise.then(function(roles) {
      $scope.opportunity.opportunity_roles = roles;
      angular.forEach($scope.opportunity.opportunity_roles, addToRolePieChart)
    });

    Opportunity.roles($scope.opportunity.id, 'recorded_hours').$promise.then(function(recorded_hours) {
      $scope.opportunity.recorded_hours = recorded_hours;
    });

    $cacheFactory.current_calendar = {};
    $cacheFactory.current_calendar.schedule = $scope.opportunity.ical;
    $cacheFactory.current_calendar.id = $scope.opportunity.id;
    $cacheFactory.current_calendar.type = 'Opportunity';
    $cacheFactory.current_calendar.start_time = new Date(parseInt($scope.opportunity.start_time))
    $cacheFactory.current_calendar.duration = $scope.opportunity.duration;


    $scope.opportunity_role = {};

    $scope.createOpportunityRole = function(opportunity_role) {
      var attr = {};
      attr.name = opportunity_role.name
      attr.opportunity_id = $scope.opportunity.id;
      attr.volunteers_required = opportunity_role.volunteers_required;
      attr.hours_required = opportunity_role.hours_required;
      attr.description = opportunity_role.description;
      OpportunityRole.create(attr).$promise.then(function(success){
        $scope.opportunity.opportunity_roles.push(success)
        $scope.opportunity_role.name = '';
        $scope.opportunity_role.volunteers_required = '';
        $scope.opportunity_role.hours_required = '';
        $scope.opportunity_role.description = '';
      })
    };

    $scope.updateOpportunityRole = function(opportunity_role) {
      var attr = {};
      attr.id = opportunity_role.id;
      attr.name = opportunity_role.name;
      attr.description = opportunity_role.description;
      attr.volunteers_required = opportunity_role.volunteers_required;
      attr.hours_required = opportunity_role.hours_required;
      var opportunity_role = OpportunityRole.update(attr)
      $scope.editing = false;
    };

    $scope.deleteOpportunityRole = function(opportunity_role) {
      var index = $scope.opportunity.opportunity_roles.indexOf(opportunity_role);
      if (index > -1) {
        $scope.opportunity.opportunity_roles.splice(index, 1);
      }
      OpportunityRole.delete(opportunity_role.id)
      $scope.opportunity_role.name = "";
      $scope.opportunity_role.description = "";
    };

    $scope.deleteOpportunityInstance = function() {
      Opportunity.delete_instance($scope.opportunity.id, start_time).$promise.then(function(result){
        $state.go($state.current, {}, {reload: true});
      });

    };

    $scope.deleteFutureInstances = function() {
      Opportunity.delete_future_instances($scope.opportunity.id, start_time).$promise.then(function(result){
        $state.go($state.current, {}, {reload: true});
      });

    };

    $scope.deleteOpportunity = function() {
      Opportunity.delete($scope.opportunity.id).$promise.then(function(result){
        $state.go($state.current, {}, {reload: true});
      });
      $state.go($state.current, {}, {reload: true});
    };

    $scope.getArray = function() {
      var volunteers = []
      angular.forEach($scope.opportunity.volunteers, function(volunteer) {
        var v = {}
        v.first_name = volunteer.first_name;
        v.last_name = volunteer.last_name;
        v.address_1 = volunteer.address_1;
        v.address_2 = volunteer.address_2;
        v.city = volunteer.city;
        v.state = volunteer.state;
        v.zip_code = volunteer.zip_code;
        v.occupation = volunteer.occupation;
        v.organization_name = volunteer.organization_name;
        v.opportunity_role = volunteer.opportunity_role;
        v.phone = volunteer.phone;
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



    var peopleResults = function(raw_result) {
      var base_result = raw_result._source
      var person = {}
      person.id = base_result.person_id;
      person.first_name = base_result.person.first_name;
      person.last_name = base_result.person.last_name;
      person.score = raw_result.score;
      $scope.organization_people.push(person)
    };

    $scope.searching = false;
    $scope.people_search = function (search) {
      if (search && !$scope.searching) {
        $scope.no_search = false;
        $scope.organization_people = [];
        $scope.searching = true;
        $http({
          url: 'api/v1/organizations/' + $stateParams.organization_Id + '/people_search',
          params: {query: search}
        }).
          success(function(data, status, headers, config) {
            angular.forEach(data, peopleResults)
            $scope.searching = false;
          }).
          error(function(data, status, headers, config) {
          });
      } else if (!search) {
        $scope.searching = false;
        $scope.no_search = true;
      }
    };


    //$scope.addOpportunityPersonModal = function (size, person) {
    //  var addOpportunityPersonModal = $modal.open(
    //    {
    //      templateUrl: 'organizations/modals/add_person_opportunity.html',
    //      controller: 'AddOpportunityPersonCtrl',
    //      windowClass: 'add-event-modal-window',
    //      size: size,
    //      resolve:
    //      {
    //        person: function() {
    //          return person;
    //        },
    //        opportunity: function(){
    //          return $scope.opportunity;
    //        },
    //        start_time: function(){
    //          return start_time;
    //        }
    //      }
    //    });
    //
    //  addOpportunityPersonModal.result.then(function () {
    //
    //    },
    //    function () {
    //
    //      console.log('Modal dismissed at: ' + new Date());
    //    });
    //};

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
        text: "Hours Recorded For Roles"
      },
      loading: false,
      size: {
        height: "250"
      }
    };

    $timeout(function(){window.dispatchEvent(new Event('resize')), 50})



  });
