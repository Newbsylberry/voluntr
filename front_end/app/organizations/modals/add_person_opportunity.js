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
  .controller('AddOpportunityPersonCtrl', function ($scope, Facebook, $stateParams,
                                                 $http, $state, opportunity, PersonOpportunity,
                                                 $modal, person, start_time, $modalInstance) {


    $scope.opportunity = opportunity;
    $scope.person = person;

    $scope.addOpportunityPerson = function() {
      var attr = {};
      attr.person_id = person.id;
      if ($scope.opportunity_role) {
        attr.opportunity_role_id = $scope.opportunity_role.id;
      };
      attr.opportunity_id = opportunity.id;
      PersonOpportunity.create(attr)
      $modalInstance.close()
    };



  });
