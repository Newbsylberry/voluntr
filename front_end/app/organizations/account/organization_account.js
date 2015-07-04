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
                                                   $rootScope, $http, $window) {

    $scope.authorize_mailchimp = function(){

      $window.location.href =
        'https://login.mailchimp.com/oauth2/authorize?client_id=491000452870&response_type=code&state='
        + btoa($stateParams.organization_Id)
    };

    //Organization.mail_chimp_check($stateParams.organization_Id, 'mail_chimp_check').$promise.then(function(data) {
    //  console.log(data)
    //})

    $scope.mailchimp_authorized = false;

    $http({
      url: 'api/v1/organizations/' + $stateParams.organization_Id +'/auth/mail_chimp_check',
      method: 'get'
    }).success(function(data){
      if (data.response) {
        console.log("MAILCHIMP")
        $scope.mailchimp_authorized = true;
        $scope.mailchimp = JSON.parse(data.response.body)
      } else if (!data.response) {
        console.log("NO MAILCHIMP")
        $scope.mailchimp_authorized = false;
      }
    }).error(function(data){
    })

  });

