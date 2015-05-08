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
                                                      Opportunity, PersonOpportunity) {



    Opportunity.get({opportunity_Id: $stateParams.opportunity_Id}, function(successResponse) {
      $scope.opportunity = successResponse;
    });

    $scope.registerForOpportunity = function() {
      var attr = {};
      attr.opportunity_id = $stateParams.opportunity_Id;
      attr.first_name = $scope.opportunityRegister.first_name;
      attr.last_name = $scope.opportunityRegister.last_name;
      attr.email = $scope.opportunityRegister.email;
      PersonOpportunity.create(attr)
    };







  });
