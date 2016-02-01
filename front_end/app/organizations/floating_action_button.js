  /**
 * Created by chrismccarthy on 3/9/15.
 */
  angular.module('voluntrApp')
    .controller('FABCtrl', function ($scope, $modal, $rootScope, $state) {

      $scope.addVolunteerOpportunity = function (size) {
        var organizationEventModal = $modal.open(
          {
            templateUrl: 'organizations/modals/organization_add_opportunity_modal.html',
            controller: 'AddOpportunityCtrl',
            windowClass: 'create-opportunity-modal',
            size: size
          });

        organizationEventModal.result.then(function () {

          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          });

      };

      $scope.current_state = $state.current.name;
      if ($state.current.name === 'organizations.registration' || $state.current.name === 'organizations.email_registration.1' || $state.current.name === 'organizations.user_organizations' || $state.current.name === 'organizations.email_registration.2') {
        $scope.show = false;
        console.log($scope.show)
      }
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
            templateUrl: 'organizations/modals/organization_add_person_modal.html',
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
