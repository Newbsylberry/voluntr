/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('ConfirmUserRegistrationCtrl', function ($scope, $modal, $rootScope, $stateParams,
                                                       $http, $state, Profile) {
    // /api/v1/users/confirmation


    $http({
      method: 'GET',
      url: '/api/v1/users/confirmation/',
      params: {confirmation_token: $stateParams.token}
    }).then(function successCallback(response) {
      $scope.user = response.data;
      if ($scope.user.password && $scope.user.profile) {
        $state.go('organizations.registration')
      }
    }, function errorCallback(response) {
      $state.go('organizations.registration')
    });

    $scope.userPass = {};
    $scope.profile = {};
    $scope.updateNewUserWithPasswordAndProfile = function () {
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
        var new_profile = {};
        new_profile.first_name = $scope.profile.first_name;
        new_profile.last_name = $scope.profile.last_name;
        new_profile.user_id = $scope.user.id;
        Profile.create(new_profile).$promise.then(function(){
          $state.go('organizations.registration')
        });
      })
    };




  });
