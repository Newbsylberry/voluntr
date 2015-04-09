  /**
 * Created by chrismccarthy on 3/9/15.
 */
  angular.module('voluntrApp')
    .controller('FABCtrl', function ($scope, $modal, $rootScope) {

      $scope.addVolunteerOpportunity = function (size) {
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
            windowClass: 'add-event-modal-window',
            size: size
          });

        organizationPersonModal.result.then(function () {

          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          });
      }

      $scope.recordHours = function (size) {
        var recordHoursModal = $modal.open(
          {
            templateUrl: 'organizations/modals/record_hours_modal.html',
            // scope: ,
            controller: 'RecordHoursCtrl',
            windowClass: 'add-event-modal-window',
            size: size
          });

        recordHoursModal.result.then(function () {

          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          });
      }


    });
