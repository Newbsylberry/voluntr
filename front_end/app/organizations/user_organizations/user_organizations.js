'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('UserOrganizationsCtrl', function ($scope, Facebook, $http, Organization,
                                                        $state, $stateParams, $modal, $localStorage) {

    $scope.$watch(function () { return $localStorage.token; },function(){
      if ($localStorage.token && $localStorage.token !== undefined) {
        $scope.logged_in = true;
        $http({
          url: 'api/v1/users/current/organizations'
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.organizations = response.data;
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      } else if (!$localStorage.token) {
        $scope.logged_in = false
      }
    });

    $scope.logInWithEmaiLregistration = function(organization){
      Organization.get_token(organization.id).$promise.then(function (data) {
        $localStorage.token = data.token;
        $state.go('organizations.organization_home', {organization_Id:organization.id})
      })
    };

    Facebook.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        $scope.connected_to_facebook = true;
        $scope.oauth_key = response.authResponse.accessToken;
      } else if (response.status !== 'connected') {
        $scope.connected_to_facebook = false;
      }
    });


    var listOrganization = function(organization) {
      if (!$scope.organizations) {
        var organizations = [];
        $scope.organizations = organizations;
      };
      Facebook.api('/' + organization.id + '/picture', {"type": "large"}, function (response) {
        organization.picture = response.data.url;
      });

      Organization.existence_check(organization.id).$promise.then(function(data) {
        if (data.id) {
          organization.exists = true;
          organization.v_id = data.id;
          organization.fb_id = data.fb_id;
          if (data.nonprofit) {
            organization.nonprofit = true
          } else if (data.volunteer_group) {
            organization.volunteer_group = true
          }
        } else if (!data.id) {
          organization.exists = false;
        }
        $scope.organizations.push(organization)
        console.log($scope.organizations)
      });
    };



    // Write authorization method here, needs to send oauth key and organization id to server
    $scope.authorizeUser = function(organization) {
      Organization.authorization($scope.oauth_key, organization.v_id).$promise.then(function(data) {
        localStorage.token = data.token;
        $state.go('organizations.organization_home', {organization_Id:data.organization.id})
      })
    };

    $scope.$watch('connected_to_facebook', function () {
      if ($scope.connected_to_facebook){
        Facebook.api('/me/accounts', function (response) {
          angular.forEach(response.data, listOrganization)
        });
      }
    });

    $scope.addFacebookOrganization = function(organization) {
      var facebookModal = $modal.open(
        {
          templateUrl: 'organizations/modals/add_facebook_organization.html',
          controller: 'AddFacebookOrganization',
          windowClass: 'add-facebook-organization-window',
          size: 'sm',
          resolve:
          {
            organization: function () {
              return organization
            }
          }
        });
      facebookModal.result.then(function () {
        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    }




  });
