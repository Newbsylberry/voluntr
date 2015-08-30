'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:OrganizationHomeCtrl
 * @description
 * # OrganizationHomeCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('GroupsHomeCtrl', function ($scope, $modal, Group) {
    $scope.loaded = false;
    Group.all().$promise.
      then(function(response){
        $scope.loaded = true;
        $scope.groups = response;
    });
    console.log($scope.groups)
  });

