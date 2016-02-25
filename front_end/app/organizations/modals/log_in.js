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
      }, {scope: 'user_groups,read_insights,manage_pages,email'});
    };

    $scope.$watch('oauth_key',function(){
      if ($scope.oauth_key) {
        Facebook.api('/me', function(response) {
          $scope.user = response;
          var attr = {};
          attr.fb_id = $scope.user.id;
          attr.token = $scope.oauth_key;
          attr.first_name = $scope.user.first_name;
          attr.last_name = $scope.user.last_name;
          attr.email = $scope.user.email;
          console.log(attr.token)
          $http({
            url: '/api/v1/users/login/facebook_login',
            method: 'GET',
            params: attr
          });
          $state.go('organizations.user_organizations');
          $modalInstance.close()
        });
      }
    })


    //$scope.facebook_log_in = function () {
    //  Facebook.login(function(response) {
    //    $scope.oauth_key = response.authResponse.accessToken;
    //    $state.go('organizations.user_organizations');
    //    $modalInstance.close()
    //  }, {scope: 'user_groups,read_insights,manage_pages,email'})
    //};

    $scope.close = function() {
      $modalInstance.close()
    };

    $scope.userSignIn = function() {
      var logInCredentials = {};
      logInCredentials.email = $scope.login.email;
      logInCredentials.password = $scope.login.password;
      Auth.login(logInCredentials).then(function(object) {
        if (object.token){
          console.log(object)
          $localStorage.token = object.token;
          $state.go('organizations.user_organizations');
          $modalInstance.close()
        } else if (!object.token) {
          $scope.error = object.error;
        }
      });
    }
  });
