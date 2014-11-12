'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:ProfilecreateCtrl
 * @description
 * # ProfilecreateCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('ProfileCreateCtrl', function ($scope, Profile, $modalInstance) {
        $scope.createProfile = function() {
            console.log("modal")
            var attr = {};
            attr.user_id = $scope.user.id;
            attr.first_name = $scope.createProfile.first_name;
            attr.last_name = $scope.createProfile.last_name;
            var newProfile = Profile.create(attr);
            $scope.user.profile = newProfile;
            $modalInstance.close();
        };
  });
