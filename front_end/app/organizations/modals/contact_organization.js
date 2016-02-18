'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('ContactOrganizationModal', function ($scope,organization,$stateParams,$http,$modalInstance) {

    $scope.organization = organization;
    $scope.sendEmail = function(){
      $http.post('/api/v1/organizations/' + $stateParams.organization_Id + '/contact_organization',
        {
          'contacting_organization_id': organization.id,
          'message': $scope.email_content
        }).
        success(function(data, status, headers, config) {
          $scope.confirmation_message = true;
          $modalInstance.close();
        }).
        error(function(data, status, headers, config) {

        });
    }

  });
