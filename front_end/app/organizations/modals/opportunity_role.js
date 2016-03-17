'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('OpportunityRoleCtrl', function ($scope,$stateParams,$timeout,opportunity_role) {

    $scope.opportunity_role = opportunity_role;

    $scope.role_people = [];

    $timeout(function(){window.dispatchEvent(new Event('resize')), 50})

    angular.forEach($scope.opportunity_role.person_opportunities, function(person_opportunity){
      console.log(person_opportunity)
      var person = {};
      person.name = person_opportunity.person.first_name + ' ' + person_opportunity.person.last_name;
      person.dates = person_opportunity.instances;
      $scope.role_people.push(person)
    })


  });
