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
                                                      Opportunity, PersonOpportunity, $modal, Organization, Facebook) {





    Opportunity.get({opportunity_Id: $stateParams.opportunity_Id}, function(successResponse) {
      $scope.opportunity = successResponse;
      Organization.get({organization_Id: successResponse.organization_id}, function(successResponse){
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
      PersonOpportunity.create(attr)
      $scope.opportunityRegister.first_name = "";
      $scope.opportunityRegister.last_name = "";
      $scope.opportunityRegister.email = "";
      $scope.opportunityRegistrationConfirmation('md')
    };

    $scope.opportunityRegistrationConfirmation = function (size) {
      var opportunityRegistrationConfirmation = $modal.open(
        {
          templateUrl: 'organizations/modals/confirm_opportunity_registration.html',
          controller: 'OpportunityRegistrationConfirmationCtrl',
          windowClass: 'add-event-modal-window',
          size: size
        });

      opportunityRegistrationConfirmation.result.then(function () {

        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    }









  });
