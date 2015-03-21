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
                                                 $http, $state, Opportunity, id,
                                                 PersonOpportunity, start_time) {




    console.log(new Date(start_time).getTime())

    $http.get('api/v1/opportunities/' + id, {params: {instance_date: new Date(start_time).getTime()}}).
      success(function(data, status, headers, config) {
        $scope.opportunity = data;
        $http.get('api/v1/opportunities/' + data.id + '/people' ).
          success(function(data, status, headers, config) {

            $scope.opportunity.people = data;
            console.log(data)
          }).
          error(function(data, status, headers, config) {

          });
      })




    $http.get('api/v1/organizations/' + $stateParams.organization_Id + '/people' ).
      success(function(data, status, headers, config) {

        $scope.organization_people = data;
      }).
      error(function(data, status, headers, config) {
        console.log(data)
      });

    $scope.commitVolunteer = function (person) {

    };

    $scope.addOpportunityPerson = function(person) {
      var attr = {};
      attr.person_id = person.id;
      attr.opportunity_id = $scope.opportunity.id;
      PersonOpportunity.create(attr)
    };


  });
