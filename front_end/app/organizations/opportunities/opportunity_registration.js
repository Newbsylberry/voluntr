'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('OpportunityRegistrationCtrl', function ($scope, People, $stateParams,
                                                       Opportunity, PersonOpportunity, $modal, Organization,
                                                       Facebook, $http, $state) {




    var createEligibleInstances = function (instance){
      if ($scope.opportunity.volunteer_goal == null) {
        $scope.opportunity.volunteer_goal = 5
      }
      if (instance.instance_volunteers.length < $scope.opportunity.volunteer_goal) {
        $scope.dates.push(instance.instance_date)
      }
    };

    Opportunity.get({opportunity_Id: $stateParams.opportunity_Id}, function(successResponse) {
      $scope.opportunity = successResponse;
      var todaysdate = new Date();
      $http({
        method: 'GET',
        url: 'api/v1/opportunity' + '/' + $scope.opportunity.id + '/schedule',
        params: {start: new Date(), end: new Date(new Date(todaysdate).setMonth(todaysdate.getMonth()+6))}
      }).then(function(successResponse){
        $scope.dates = [];
        angular.forEach(successResponse.data, createEligibleInstances)
      });



      Organization.get({organization_Id: successResponse.organization_id}, function(successResponse){
        $scope.custom_url = successResponse.custom_url;
        Facebook.api('/' + successResponse.fb_id + '/picture', {"type": "large"}, function (response) {
          $scope.organization_picture = response.data.url;
        });
      })
    });



    $scope.registerForOpportunity = function() {
        var attr = {};
        attr.opportunity_id = $stateParams.opportunity_Id;
        attr.first_name = $scope.opportunityRegister.first_name;
        attr.last_name = $scope.opportunityRegister.last_name;
        attr.email = $scope.opportunityRegister.email;
        if ($scope.opportunityRegister.dates) {
          attr.instances = $scope.opportunityRegister.dates;
        }
        attr.organization_id = $scope.opportunity.organization_id;
        PersonOpportunity.create(attr).$promise.then(function(response){
          $state.go('organization_volunteer_registration.2', {token:btoa(response.id),
            organization_custom_Url:$scope.custom_url})
        });
    };










  });
