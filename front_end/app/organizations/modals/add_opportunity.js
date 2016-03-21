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
                                              $modalInstance, OpportunityRole, $state,Upload) {



    $scope.organization = {};
    $scope.organizations = [];
    $scope.calendar = {};
    $scope.calendar.repeat = {};
    $scope.calendar.raw_start = new Date();
    $scope.files = [];

    $scope.$watch('calendar.duration', function () {
      if ($scope.calendar.duration < 3600000){
        $scope.duration_label = 'minutes'
      } else if ($scope.calendar.duration < (3600000 * 2)) {
        $scope.duration_label = 'hour'
      } else {
        $scope.duration_label = 'hours'
      };
      $scope.calendar.end_time = $scope.calendar.raw_start.getTime() + $scope.calendar.duration;
    });

    $scope.removeOrganization = function(organization) {
      var index = $scope.organizations.indexOf(organization);
      if (index > -1) {
        $scope.organizations.splice(index, 1);
      }
    };

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

    $scope.$watch('files',function(){
      $scope.resources = [];
      angular.forEach($scope.files,function(file){
        var resource = {};
        resource.name = file.name;
        resource.file = file
        $scope.resources.push(resource);
      })
    })

    $scope.newOpportunity = function(){
      var attr = {};
      attr.calendar = $scope.calendar;
      if ($scope.newOpportunity.volunteer_goal) {
        attr.volunteer_goal = $scope.newOpportunity.volunteer_goal;
      }
      attr.calendar.start_time = Date.parse($scope.calendar.raw_start)
      attr.name = $scope.newOpportunity.opportunity_name;
      attr.calendar.end_time = $scope.calendar.end_time;
      attr.description = $scope.newOpportunity.description;
      attr.address_1 = $scope.newOpportunity.address_1;
      attr.address_2 = $scope.newOpportunity.address_2;
      attr.zip_code = $scope.newOpportunity.zip_code;
      attr.city = $scope.newOpportunity.city;
      attr.collaborative = $scope.newOpportunity.collaborative;
      attr.state = $scope.newOpportunity.state;
      attr.organization_id = $stateParams.organization_Id;
      attr.collaborative = $scope.newOpportunity.collaborative;
      attr.volunteer_goal = $scope.newOpportunity.volunteer_goal;
      attr.organizations = $scope.organizations;
      var opportunity = Opportunity.create(attr).$promise.then(function(opportunity){
        angular.forEach($scope.roles, function(role){
          role.opportunity_id = opportunity.id;
          OpportunityRole.create(role)
        })
        if ($scope.files.length > 0) {
          angular.forEach($scope.resources, function (resource) {
            Upload.upload({
              url: '/api/v1/resources',
              method: 'POST',
              fields: {
                "resource[name]": resource.name,
                "resource[description]": resource.description,
                "resource[resourceable_type]": "Opportunity",
                "resource[resourceable_id]": opportunity.id
              },
              file: {'resource[resource]': resource.file}
            }).then(function (resp) {
              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
              console.log('Error status: ' + resp.status);
            }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
          })
        }
      });
      if ($state.current.name === 'organizations.opportunities_home') {
        $state.go($state.current, {}, {reload: true});
      }
      $modalInstance.dismiss('cancel');
    };




  });
