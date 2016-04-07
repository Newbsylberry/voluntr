'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:ResetPasswordCtrl
 * @description
 * # ResetPasswordCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
.controller('UserResetPasswordCtrl', ['$scope','$http','$stateParams',
function($scope,$http,$stateParams) {
  $scope.data = {};

  $scope.resetPassword = function() {
    var data = {
      password: $scope.data.password,
      reset_token: $stateParams.resetToken
    };
    $http.post('/api/v1/users/update_password', data)
    .then(function() {
      $scope.passwordReset = true;
    })
    .catch(function() {
      $scope.passwordReset = true;
    });
  }
}
]);
