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
                                                        $localStorage, Auth, Profile) {
    $scope.register = {};
    $scope.organization = {};
    $scope.facebook_log_in = function () {
      Facebook.login(function(response) {
        $scope.oauth_key = response.authResponse.accessToken;
          $state.go('organizations.user_organizations');
      }, {scope: 'user_groups,read_insights,manage_pages'})
    };

    $scope.progress = 33;
    $scope.registration_prompt = 'Step 1:  Initial Information'

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
      $scope.registration_prompt = 'Step 2:  Additional Information'
      $scope.progress = 66;
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
      var profile = {}
      profile.first_name = $scope.register.first_name;
      profile.last_name = $scope.register.last_name;
      Profile.create(profile);
      $http({
        method: 'PATCH',
        url: '/api/v1/users/update_password',
        data: attr
      }).then(function successCallback(response) {
        Organization.get_token($scope.organization_id).$promise.then(function (data) {
          $localStorage.token = data.token;
          $scope.progress = 99;
          $scope.registration_prompt = 'Step 3:  Add Organization Address'
      $state.go('organizations.email_registration.3')
        })
      })
    };

    $scope.updateNewUserWithAddress = function(){
      var attr = {}
      attr.id = $scope.organization_id;
      attr.address_1 = $scope.organization.address;
      attr.address_2 = $scope.organization.address2;
      attr.city = $scope.organization.city;
      attr.state = $scope.organization.state;
      attr.zip_code = $scope.organization.postalCode;
      Organization.update(attr).$promise.then(function(){
        $state.go('organizations.user_organizations', {organization_Id: $scope.organization_id})
      });
    }

    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      })
  });



