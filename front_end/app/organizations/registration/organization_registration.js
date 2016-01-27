'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('OrganizationRegistrationCtrl', function ($scope, Facebook, $http, Organization,
                                                        $state, $stateParams, $modal,
                                                        $localStorage, Auth) {

    $scope.register = {};
    $scope.register.organization_type = 1;

    $scope.facebook_log_in = function () {
      Facebook.login(function(response) {
        $scope.oauth_key = response.authResponse.accessToken;
          $state.go('organizations.user_organizations');
      }, {scope: 'user_groups,read_insights,manage_pages'})

    };

    $scope.createUser = function () {
      var credentials = {};
      credentials.email = $scope.register.user_email;
      credentials.organization = {};
      credentials.organization.organization_type_name = $scope.register.organization_type_name;
      credentials.organization.organization_name = $scope.register.organization_name;
      Auth.register(credentials).then(function(object){
        $localStorage.token = object.token;
        $scope.organization_id = object.organization_id;
        $state.go('organizations.email_registration.2')
      })
    };

    $scope.log_in_modal = function (size) {
      var emailRegistrationModal = $modal.open(
        {
          templateUrl: 'organizations/modals/log_in.html',
          controller: 'EmailLogInCtrl',
          windowClass: 'email-registration-modal',
          size: size
        });

      emailRegistrationModal.result.then(function () {

        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
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
        Organization.get_token($scope.organization_id).$promise.then(function (data) {
          $localStorage.token = data.token;
          $state.go('organizations.user_organizations', {organization_Id: $scope.organization_id})
        })
      })
    };
  });



