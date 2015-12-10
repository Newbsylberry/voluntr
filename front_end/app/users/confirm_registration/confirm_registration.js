/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('ConfirmUserRegistrationCtrl', function ($scope, $modal, $rootScope, $stateParams,
                                                       $http, $state) {
    // /api/v1/users/confirmation


    $http({
      method: 'GET',
      url: '/api/v1/users/confirmation/',
      params: {confirmation_token: $stateParams.token}
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.user = response.data;
    }, function errorCallback(response) {

      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    $scope.userPass = {};

    $scope.updateNewUserWithPassword = function () {
      console.log($scope.user)
      var attr = {};
      attr.user = {};
      attr.user.id = $scope.user.id;
      attr.user.password = $scope.userPass.password;
      attr.user.password_confirmation = $scope.userPass.confirm_password;
      $http({
        method: 'PATCH',
        url: '/api/v1/users/update_password',
        data: attr
      }).then(function successCallback(response) {
        $state.go('organizations.registration')
      })
    };




  });
