'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:AddeventcontrollerCtrl
 * @description
 * # AddeventcontrollerCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('GetInvolvedOpportunityCtrl', function ($scope, $modal, $modalInstance, opportunity) {


    $scope.opportunity = opportunity;




  });
