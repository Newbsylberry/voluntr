'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:ResetPasswordCtrl
 * @description
 * # ResetPasswordCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
.controller('ResetPasswordCtrl', ['$scope','$http',
function($scope,$http) {

  $scope.formData = {};

  $scope.requestReset = function() {
    var data = $scope.formData;

    $http.post('api/v1/users/reset_password', data)
    .then(function() {
        $scope.requestSent = true;
    })
  }
}
]);
