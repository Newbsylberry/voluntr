'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('EmailRegistrationCtrl', function ($scope, $modalInstance, $http, Auth, $state) {

    $scope.registerOrganization = function(){
      var attr = {};
      attr.organization = {};
      attr.organization.name = $scope.register.organization_name;
      attr.user_email = $scope.register.user_email;
      $http({
        method: 'post',
        url: '/api/v1/organizations/create/with_email/',
        data: attr
      }).then(function(organization){
        console.log(organization)
      })
    };

    $scope.createUser = function () {
      var credentials = {};
      credentials.email = $scope.register.user_email;
      credentials.organization = {};
      credentials.organization.organization_name = $scope.register.organization_name;
      //credentials.password = $scope.signUp.password; // see above
      //credentials.passwordConfirmation = $scope.signUp.passwordConfirmation; // see above
      //var attr = {}
      //attr.organization_name = $scope.register.organization_name;
      //var config = {
      //  data: {'organization_name': $scope.register.organization_name}
      //};
      Auth.register(credentials).then(function(object){ //credentials are passed to Auth, which speaks with the devise gem in rails
        // $rootScope.user = object.user;
        //when a new user is created assign data to both local and session storage
        localStorage.token = object.token;
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
      }).then(function successCallback(response){
        $modalInstance.close()
        $state.go('organizations.tutorial.1', {organization_Id:response.data.organization_id})
      })
    };
  });
