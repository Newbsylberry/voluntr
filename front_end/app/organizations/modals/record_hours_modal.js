/**
 * Created by chrismccarthy on 4/6/15.
 */
/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('RecordHoursCtrl', function ($scope, $modal, $rootScope, RecordedHours,
                                           $stateParams, $http, People) {

    console.log($stateParams.organization_Id);
    $scope.recordHours = function() {
      var record_hours_attr = {};
      record_hours_attr.hours = $scope.recordHours.hours;
      record_hours_attr.organization_id = $stateParams.organization_Id;
      record_hours_attr.description = $scope.description;
      if ($scope.new_volunteer) {
        var attr = {};
        attr.first_name = $scope.first_name;
        attr.last_name = $scope.last_name;
        attr.email = $scope.email;
        attr.organization_id = $stateParams.organization_Id;
        People.create(attr)
          .$promise.then(function (person) {
          record_hours_attr.person_id = person.id;
          console.log(person);
          RecordedHours.create(record_hours_attr)
        })}
      else
      {
        record_hours_attr.person_id = $scope.volunteer_id;
        RecordedHours.create(record_hours_attr);
      }
    };


    $scope.selectHoursPerson = function(person) {
      $scope.first_name = person.first_name;
      $scope.last_name = person.last_name;
      $scope.email = person.email;
      $scope.volunteer_id = person.id;
      console.log($scope.volunteer_id)
    };



    $http.get('api/v1/organizations/' + $stateParams.organization_Id + '/people' ).
      success(function(data, status, headers, config) {
        $scope.organization_people = data;
      }).
      error(function(data, status, headers, config) {
        console.log(data)
      });

    $scope.clearPerson = function() {
      $scope.first_name = "";
      $scope.last_name = "";
      $scope.email = "";
      $scope.volunteer_id = "";
    };


    $scope.first_name = "";
    $scope.last_name = "";
    $scope.email = "";
    $scope.$watchGroup(['first_name', 'last_name', 'email'], function () {
      if ($scope.first_name !== "" || $scope.last_name !== "" || $scope.email !== "") {
        $scope.results = true;
      } else  {
        $scope.results = false;
      }
      if ($scope.first_name === "" || $scope.last_name === "" || $scope.email === "") {
        console.log($scope.new_volunteer_validation)
        $scope.new_volunteer_validation = true
      } else {
        $scope.new_volunteer_validation = false
      }
    });



  });

