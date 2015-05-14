/**
 * Created by chrismccarthy on 5/12/15.
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
  .controller('OpportunitySignInCtrl', function ($scope, People, $stateParams,
                                                       Opportunity, PersonOpportunity, $modal, $filter) {






    Opportunity.get({opportunity_Id: $stateParams.opportunity_Id}, function(successResponse) {
      console.log(successResponse)
      $scope.opportunity = successResponse;
    });



    $scope.signInForOpportunity = function() {
      var attr = {};
      attr.first_name = $scope.opportunitySignIn.first_name;
      attr.last_name = $scope.opportunitySignIn.last_name;
      attr.email = $scope.opportunitySignIn.email;
      attr.organization_id = $scope.opportunity.organization_id;
      console.log(attr)
      var person = People.create(attr)
      $scope.opportunitySignIn.first_name = "";
      $scope.opportunitySignIn.last_name = "";
      $scope.opportunitySignIn.email = "";
      $scope.opportunitySignInConfirmation('md', person, $scope.opportunity)
    };



    $scope.opportunitySignInConfirmation = function (size, person, opportunity) {
      var opportunitySignInConfirmation = $modal.open(
        {
          templateUrl: 'organizations/modals/confirm_opportunity_sign_in.html',
            controller: 'OpportunitySignInConfirmationCtrl',
          windowClass: 'add-event-modal-window',
          resolve: {
            person: function() {
              return person
            },
            opportunity: function() {
              return opportunity
            }
          },
          size: size
        });

      opportunitySignInConfirmation.result.then(function () {

        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    }

    $scope.opportunitySignIn = {};
    $scope.opportunitySignIn.first_name = "";
    $scope.opportunitySignIn.last_name = "";
    $scope.opportunitySignIn.email = "";


    $scope.$watchGroup(['opportunitySignIn.first_name',
      'opportunitySignIn.last_name',
      'opportunitySignIn.email'], function () {
      if ($scope.opportunitySignIn.first_name !== "" ||
        $scope.opportunitySignIn.last_name !== "" ||
        $scope.opportunitySignIn.email !== "") {
        $scope.registration_found = true;
        $scope.filtered = $filter('filter')($scope.opportunity.signed_up_volunteers,
          {first_name: $scope.opportunitySignIn.first_name,
          last_name: $scope.opportunitySignIn.last_name,
            email: $scope.opportunitySignIn.email})
      } else  {
        $scope.registration_found = false;
      }
    });









  });

