'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('EmailRegistrationCtrl', function ($scope, $modalInstance, $http, Auth, $state,
                                                 $localStorage, Organization) {



    $scope.userSignIn = function() {
      var logInCredentials = {};
      logInCredentials.email = $scope.login.email;
      logInCredentials.password = $scope.login.password;
      Auth.login(logInCredentials).then(function(object) {
        $localStorage.token = object.token;
        $modalInstance.close()
      }, function(error) {
        alert("Login Failed :(");
      });
    }

    $scope.createUser = function () {
      var credentials = {};
      credentials.email = $scope.register.user_email;
      credentials.organization = {};
      credentials.organization.organization_name = $scope.register.organization_name;
      Auth.register(credentials).then(function(object){
        $localStorage.token = object.token;
        $scope.organization_id = object.organization_id;
        $scope.update_with_password = true;
      })
    };

    $scope.updateNewUserWithPassword = function () {
      var attr = {};
      attr.user = {};
      attr.user.password = $scope.register.password;
      attr.user.password_confirmation = $scope.register.confirm_password;
      $http({
        method: 'PATCH',
        url: '/api/v1/users/update_password',
        data: attr
      }).then(function successCallback(response) {
        console.log($scope.organization_id);
        Organization.get_token($scope.organization_id).$promise.then(function (data) {
          $localStorage.token = data.token;
          $modalInstance.close()
          $state.go('organizations.tutorial.1', {organization_Id: $scope.organization_id})
        })
      })
    };
  });
