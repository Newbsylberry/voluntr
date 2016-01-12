'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:AddeventcontrollerCtrl
 * @description
 * # AddeventcontrollerCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('AddOpportunityCtrl', function ($scope, $timeout, Opportunity, $stateParams, $http, $modal,
                                              $modalInstance, OpportunityRole, $state) {




    $scope.calendar = {};
    $scope.calendar.repeat = {};

    $scope.$watch('calendar.duration', function () {
      if ($scope.calendar.duration < 3600000){
        $scope.duration_label = 'minutes'
      } else if ($scope.calendar.duration < (3600000 * 2)) {
        $scope.duration_label = 'hour'
      } else {
        $scope.duration_label = 'hours'
      };
      $scope.calendar.end_time = $scope.calendar.start_time.getTime() + $scope.calendar.duration;
    });

    $scope.roles = [];
    $scope.role = {};
    $scope.createRole = function(role) {
      var attr = {};
      attr.name = role.name;
      if (role.description) {
        attr.description = role.description;
      }
      if (role.volunteers_required) {
        attr.volunteers_required = role.volunteers_required;
      }
      if (role.hours_required) {
        attr.volunteers_required = role.hours_required;
      }
      $scope.roles.push(attr)
      $scope.role.name = "";
      $scope.role.description = "";
      $scope.role.volunteers_required = "";
      $scope.role.hours_required = "";
    };

    $scope.newOpportunity = function(){
      conn
      var attr = {};
      attr.calendar = $scope.calendar;
      if ($scope.calendar.start_time != undefined) {
        attr.calendar.start_time = $scope.calendar.start_time.getTime();
      }
      if ($scope.calendar.repeat.repeat_until != undefined) {
        attr.calendar.repeat.repeat_until = $scope.calendar.repeat.repeat_until.getTime();
      }
      if ($scope.newOpportunity.volunteer_goal) {
        attr.volunteer_goal = $scope.newOpportunity.volunteer_goal;
      }
      attr.name = $scope.newOpportunity.opportunity_name;
      attr.calendar.end_time = $scope.calendar.end_time;
      attr.description = $scope.newOpportunity.description;
      attr.address = $scope.newOpportunity.address;
      attr.zip_code = $scope.newOpportunity.zip_code;
      attr.city = $scope.newOpportunity.city;
      attr.state = $scope.newOpportunity.state;
      attr.organization_id = $stateParams.organization_Id;
      attr.volunteer_goal = $scope.newOpportunity.volunteer_goal;
      var opportunity = Opportunity.create(attr).$promise.then(function(opportunity){
        angular.forEach($scope.roles, function(role){
          role.opportunity_id = opportunity.id;
          OpportunityRole.create(role)
        })
      });
      if ($state.current.name === 'organizations.opportunities_home') {
        $state.go($state.current, {}, {reload: true});
      }
      $modalInstance.dismiss('cancel');

    };




  });
