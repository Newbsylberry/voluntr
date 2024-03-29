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
    $scope.instance = start_time._start._i;

    $http({
      url: 'api/v1/opportunities/' + $scope.opportunity.id + '/instance',
      method: "GET",
      params: {instance_date: $scope.instance}
    }).then(function(instance){
      console.log(instance)
      $scope.instance_volunteers = instance.data.instance_volunteers;

    })

    // $scope.instance = start_time._d._i;



    $scope.addOpportunityPerson = function() {
      var attr = {};
      attr.person_id = $scope.person.id;
      attr.instances = $scope.instance;
      if ($scope.opportunity_role) {
        attr.opportunity_role_id = $scope.opportunity_role.id;
      };
      attr.opportunity_id = opportunity.id;
      console.log(attr)
      PersonOpportunity.create(attr)
      $modalInstance.close()
    };



  });
