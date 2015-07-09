'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:OrganizationHomeCtrl
 * @description
 * # OrganizationHomeCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('OrganizationAccountCtrl', function ($scope, Organization,
                                                   $stateParams, $state,
                                                   $rootScope, $http, $window, ENV) {

    Organization.get({organization_Id: $stateParams.organization_Id}, function(successResponse) {
      $scope.organization = successResponse;
    });



    $scope.authorize_mailchimp = function(){
      $window.location.href =
        'https://login.mailchimp.com/oauth2/authorize?client_id='+ ENV.mailchimp_id + '&response_type=code&state='
        + btoa($stateParams.organization_Id)
    };

    $http({
      url: 'api/v1/organizations/' + $stateParams.organization_Id +'/auth/mail_chimp_check',
      method: 'get'
    }).success(function(data){
     console.log(data)
      if (data.response) {
        $scope.mailchimp_authorized = true;
        $scope.mailchimp = JSON.parse(data.response.body)
      } else if (!data.response) {

        $scope.mailchimp_authorized = false;
      }
    }).error(function(data){
    })

  });

