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
      reset_password_token: $stateParams.resetToken
    };
    $http.post('/api/v1/users/update_password_reset', data)
    .then(function(object) {
      if (object.token){
        delete $localStorage.token;
        $localStorage.token = object.token;
      } else if (!object.token) {
        console.log("ERROR");
      }
    })
    .catch(function() {

    });
  }
}
]);
