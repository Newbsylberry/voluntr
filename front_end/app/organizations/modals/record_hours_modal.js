/**
 * Created by chrismccarthy on 4/6/15.
 */
/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('RecordHoursCtrl', function ($scope, $modal, $rootScope, RecordedHours,
                                           $stateParams, $http, People,
                                           $modalInstance, Organization, $filter, $state) {



    Organization.get(
      {organization_Id: $stateParams.organization_Id}, function (successResponse) {
        $scope.opportunities = successResponse.opportunities;
      });



    $scope.recordHours = function() {
      var record_hours_attr = {};
      record_hours_attr.hours = $scope.recordHours.hours;
      record_hours_attr.organization_id = $stateParams.organization_Id;
      record_hours_attr.description = $scope.description;
      var attr = {};
      attr.first_name = $scope.first_name;
      attr.last_name = $scope.last_name;
      attr.email = $scope.email;
      if ($scope.opportunity) {
        record_hours_attr.opportunity_id = $scope.opportunity.id;
      } if ($scope.opportunity_role) {
        record_hours_attr.opportunity_role_id = $scope.opportunity_role.id;
      } if ($scope.new_volunteer) {
        attr.organization_id = $stateParams.organization_Id;
        People.create(attr)
          .$promise.then(function (person) {
            record_hours_attr.person_id = person.id;
            var newRecordedHours = RecordedHours.create(record_hours_attr);
          })
      } else {
        attr.id = $scope.volunteer_id;
        People.update(attr)
          .$promise.then(function(person) {
            record_hours_attr.person_id = $scope.volunteer_id;
            var newRecordedHours = RecordedHours.create(record_hours_attr);
        })
      }
      if ($state.current.name === 'organizations.organization_home') {
        $state.go($state.current, {}, {reload: true});
      }
      $modalInstance.close();
    };


    $scope.selectHoursPerson = function(person) {
      $scope.first_name = person.first_name;
      $scope.last_name = person.last_name;
      $scope.email = person.email;
      $scope.volunteer_id = person.id;
    };

    $scope.organization_people = Organization.people($stateParams.organization_Id, 'people');

    $scope.clearPerson = function() {
      $scope.first_name = "";
      $scope.last_name = "";
      $scope.email = "";
      $scope.volunteer_id = "";
      $scope.filtered = []
    };


    $scope.first_name = "";
    $scope.last_name = "";
    $scope.email = "";
    $scope.$watchGroup(['first_name', 'last_name', 'email'], function () {
      if ($scope.first_name !== "" || $scope.last_name !== "" || $scope.email !== "") {
        $scope.results = true;
        $scope.filtered = $filter('filter')($scope.organization_people, {first_name: $scope.first_name,
          last_name: $scope.last_name})
      } else  {
        $scope.results = false;
      }
      if ($scope.first_name === "" || $scope.last_name === "" || $scope.email === "") {
        $scope.new_volunteer_validation = true
      } else {
        $scope.new_volunteer_validation = false
      }
    });

  });

