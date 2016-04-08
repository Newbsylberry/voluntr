'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:ResetPasswordCtrl
 * @description
 * # ResetPasswordCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
.controller('UserResetPasswordCtrl', ['$scope','$http','$stateParams','$localStorage','$state',
function($scope,$http,$stateParams,$localStorage,$state) {
  $scope.data = {};

  $scope.resetPassword = function() {
    var data = {
      password: $scope.data.password,
      reset_password_token: $stateParams.resetToken
    };
    $http.post('/api/v1/users/update_password_reset', data)
    .then(function(object) {
        if (object.data.token){
          delete $localStorage.token;
          $localStorage.token = object.data.token;
          $state.go('organizations.user_organizations');
      } else if (!object.data.token) {
        alert("Something Went Wrong...  We're sorry and will fix it :( ");
      }
    })
    .catch(function() {

    });
  }
}
]);
