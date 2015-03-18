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
  .controller('OpportunityDetailCtrl', function ($scope, Facebook, $stateParams,
                                                 $http, $state, Opportunity, id) {



    console.log(id)

    Opportunity.get({opportunity_Id: id}, function(successResponse) {
      $scope.opportunity = successResponse;
    })


  });
