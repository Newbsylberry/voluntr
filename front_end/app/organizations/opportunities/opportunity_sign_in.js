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
                                                       Opportunity, PersonOpportunity,
                                                        $modal, $filter, Facebook, $state, RecordedHours, $timeout) {
    $scope.photo_consent = true;
    $scope.contact_me = true;
    $scope.recordedHour = {};
    $scope.confirmed = false;

    Opportunity.get({opportunity_Id: $stateParams.opportunity_Id}, function(successResponse) {
      $scope.opportunity = successResponse;
      if (!successResponse.organization.picture) {
      Facebook.api('/' + successResponse.organization.fb_id + '/picture', {"type": "large"}, function (response) {
          $scope.organization_picture = response.data.url;
      })
      } else if (successResponse.organization.picture) {
        console.log(successResponse.organization)
        $scope.organization_picture = successResponse.organization.picture.url;
      }
    });

    $scope.terms_of_service = true;

    $scope.$watchGroup([
      'opportunitySignIn.first_name',
      'opportunitySignIn.last_name',
      'opportunitySignIn.email',
      'opportunitySignIn.phone','opportunitySignIn.no_email_or_phone'], function(){
      if (
        (!$scope.opportunitySignIn.first_name || !$scope.opportunitySignIn.last_name) &&
        (!$scope.opportunitySignIn.email || !$scope.opportunitySignIn.phone || !$scope.opportunitySignIn.no_email_or_phone)
      ) {
        $scope.form_complete = false;
      } else if (
        ($scope.opportunitySignIn.first_name && $scope.opportunitySignIn.last_name) &&
        ($scope.opportunitySignIn.email || $scope.opportunitySignIn.phone || $scope.opportunitySignIn.no_email_or_phone)
      ) {
        $scope.form_complete = true;
      }
    });


    $scope.signInForOpportunity = function() {
      var attr = {};
      attr.first_name = $scope.opportunitySignIn.first_name;
      attr.last_name = $scope.opportunitySignIn.last_name;
      if ($scope.opportunitySignIn.email) {
      attr.email = $scope.opportunitySignIn.email;
      } if ($scope.opportunitySignIn.phone) {
        attr.phone = $scope.opportunitySignIn.phone;
      }
      attr.organization_id = $scope.opportunity.organization_id;
      People.create(attr).$promise.then(function(response){
        $scope.person = response;
        $scope.opportunitySignIn.first_name = "";
        $scope.opportunitySignIn.last_name = "";
        $scope.opportunitySignIn.email = "";
        $scope.opportunitySignIn.phone = "";
        $state.go('sign_in_form.confirmation_information', {opportunity_Id:$scope.opportunity.id})
      })
    };

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


    $scope.recordHours = function (organization) {
      var attr = {};
      attr.hours = $scope.recordedHour.hours;
      attr.date_recorded = new Date().toString();
      if ($scope.recordedHour.opportunity_role) {
        attr.opportunity_role_id = $scope.recordedHour.opportunity_role;
      }
      attr.person_id = $scope.person.id;
      attr.opportunity_id = $stateParams.opportunity_Id;
      if (organization) {
        attr.organization_id = organization.id;
      }
      attr.instance = new Date($stateParams.instance_date);
      attr.photo_consent = $scope.photo_consent;
      attr.contact_me = $scope.contact_me;
      attr.sign_in  = true;
      console.log(attr)
      RecordedHours.create(attr);
      $scope.confirmed = true;
      $timeout(function() {
        $state.go('sign_in_form.initial_information', {opportunity_Id:$scope.opportunity.id}, {reload: true})
      }, 1000)
    };


    $scope.$watch('opportunity_role', function(){
      if ($scope.opportunity_role && $scope.opportunity_role.hours_required){
        $scope.hours = $scope.opportunity_role.hours_required;
      }
    });


    //Idle.watch();
    //
    //$scope.$on('IdleTimeout', function() {
    //  $scope.timeDuration();
    //});









  });

