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
                                                   Upload, $timeout,$mdDialog) {

    Organization.get({organization_Id: $stateParams.organization_Id}, function(successResponse) {
      $scope.organization = successResponse;
      if ($scope.organization.picture.picture.url === null){
        Facebook.api('/' + successResponse.fb_id + '/picture', {"type": "large"}, function (response) {
          $scope.organization.fb_picture = response.data.url;
        });
      }
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
      if (data.mail_chimp) {
        $scope.mailchimp_authorized = true;
        $scope.mailchimp = data.mail_chimp
      } else if (data.error) {
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



    var warning_messages = ['DANGER ZONE','HERE BE DRAGONS']
    $scope.warning_message = warning_messages[Math.floor(Math.random()*warning_messages.length)]

    $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Would you like to delete your Organization?')
        .textContent('Everything will be deleted.')
        .targetEvent(ev)
        .ok('I Want Out!')
        .cancel("I'll Give You More Time");
      $mdDialog.show(confirm).then(function() {
          Organization.delete($scope.organization.id).$promise.then(function(){
          })
        $scope.status = 'You decided to get rid of your debt.';
        $state.go('landing_page')
      }, function() {
        $scope.status ="We're glad you decided to stay";
      });
    };

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

    $scope.$watch('file',function(){
      if ($scope.file) {
        Upload.upload({
          url: '/api/v1/organizations/' + $scope.organization.id,
          method: 'PATCH',
          file: {'organization[picture]': $scope.file}
        }).then(function (resp) {
          $scope.organization.picture = resp.data.picture;
        });
      }
    });




  });

