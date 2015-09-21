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
                                                   $rootScope, $http, $window, ENV,
                                                   OrganizationMailingService, Facebook,
                                                   Upload, $timeout) {

    Organization.get({organization_Id: $stateParams.organization_Id}, function(successResponse) {
      $scope.organization = successResponse;
      Facebook.api('/' + successResponse.fb_id + '/picture', {"type": "large"}, function (response) {
        $scope.organization.picture = response.data.url;
      });
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
      if (data.response) {
        $scope.mailchimp_authorized = true;
        $scope.mailchimp = JSON.parse(data.response.body)
      } else if (!data.response) {
        $scope.mailchimp_authorized = false;
      }
    }).error(function(data){
    });

    $scope.delete = function(mailing_service) {
      OrganizationMailingService.delete(mailing_service.id)
      var index = $scope.organization.organization_mailing_services.indexOf(mailing_service);
      if (index > -1) {
        $scope.organization.organization_mailing_services.splice(index, 1);
      }
      $scope.mailchimp_authorized = false;
    }

    $scope.uploadFiles = function(file) {
      $scope.f = file;
      if (file && !file.$error) {
        file.upload = Upload.upload({
          url: 'api/v1/organizations/' + $scope.organization.id,
          method: 'PATCH',
          // fields: { 'organization[name]': $scope.organization.name },
          file: {'organization[terms_of_service_file]': file}
        });

        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
          });
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 *
            evt.loaded / evt.total));
        });
      }
    }

  });

