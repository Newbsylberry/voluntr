'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('EmailLogInCtrl', function ($scope, $modalInstance, $http, Auth, $state,
                                                 $localStorage, Facebook) {

    $scope.facebook_log_in = function () {
      Facebook.login(function(response) {
        $scope.oauth_key = response.authResponse.accessToken;
        $state.go('organizations.user_organizations');
        $modalInstance.close()
      }, {scope: 'user_groups,read_insights,manage_pages'})

    };

    $scope.close = function(){
      $modalInstance.close()
    }
    $scope.userSignIn = function() {
      var logInCredentials = {};
      logInCredentials.email = $scope.login.email;
      logInCredentials.password = $scope.login.password;
      Auth.login(logInCredentials).then(function(object) {
        if (object){
        $localStorage.token = object.token;
        $state.go('organizations.user_organizations');
          $modalInstance.close()
        } if (!object) {
          console.log("Error")
        }
      });
    }
  });
