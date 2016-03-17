  /**
 * Created by chrismccarthy on 3/9/15.
 */
  angular.module('voluntrApp')
    .controller('FABCtrl', function ($scope, $modal, $rootScope, $state) {

      $scope.addVolunteerOpportunity = function (size) {
        var organizationEventModal = $modal.open(
          {
            templateUrl: 'organizations/modals/add_opportunity.html',
            controller: 'AddOpportunityCtrl',
            windowClass: 'add-opportunity-modal',
            size: size
          });

        organizationEventModal.result.then(function () {

          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          });

      };

      $scope.recordHours = function (size) {
        var recordHoursModal = $modal.open(
          {
            templateUrl: 'organizations/modals/record_hours_modal.html',
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




      $scope.addOrganizationPerson = function (size) {
        var organizationPersonModal = $modal.open(
          {
            templateUrl: 'organizations/modals/add_person.html',
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

      $scope.addGroup = function (size) {
        var addGroupModal = $modal.open(
          {
            templateUrl: 'organizations/modals/add_group.html',
            controller: 'AddGroupCtrl',
            windowClass: 'add-event-modal-window',
            size: size
          });

        addGroupModal.result.then(function () {

          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          });
      }




    });
