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
                                                 $modal, start_time, $modalInstance) {


    $scope.opportunity = opportunity;

    // $scope.instance = start_time._d._i;

    $scope.instance = start_time._start._i;

    $scope.addOpportunityPerson = function() {
      var attr = {};
      attr.person_id = $scope.person.id;
      attr.instance = $scope.instance;
      if ($scope.opportunity_role) {
        attr.opportunity_role_id = $scope.opportunity_role.id;
      };
      attr.opportunity_id = opportunity.id;
      PersonOpportunity.create(attr)
      $modalInstance.close()
    };



  });
