  /**
 * Created by chrismccarthy on 3/9/15.
 */
  angular.module('voluntrApp')
    .controller('FABCtrl', function ($scope, $modal, $rootScope) {

      $scope.addOpportunity = function (size) {
        var organizationEventModal = $modal.open(
          {
            templateUrl: 'organizations/opportunities/organization_add_position_modal.html',
            controller: 'AddOpportunityCtrl',
            windowClass: 'add-event-modal-window',
            size: size
          });

        organizationEventModal.result.then(function () {

          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          });
      };



      $scope.addOrganizationPerson = function (size) {
        var organizationPersonModal = $modal.open(
          {
            templateUrl: 'organizations/people/organization_add_person_modal.html',
            controller: 'AddPeopleCtrl',
            // windowClass: 'add-event-modal-window',
            size: size
          });

        organizationPersonModal.result.then(function () {

          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          });
      }


    });
