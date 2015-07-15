angular.module('voluntrApp')
  .controller('OrganizationVolunteerRegistrationCtrl', function ($scope, $stateParams, $http,
                                                                 $state, $filter, $rootScope, Facebook, Organization,
                                                                 People, $timeout) {



    Organization.get({organization_Id: $stateParams.organization_Id}, function(successResponse) {
      // find the organizations information on facebook
      $scope.organization = successResponse
      Facebook.api('/' + successResponse.fb_id + '/picture', {"type": "large"}, function (response) {
        $scope.organization.picture = response.data.url;
      });

      $scope.submittable = false;

      if (!$state.params.person_token) {
        $scope.person = {};
      } else if ($state.params.person_token) {
        People.get({person_Id: atob($state.params.person_token)}, function(successResponse) {
          $scope.person = successResponse;
          console.log($scope.person);
        })
      }


      $scope.$watchGroup(['person.first_name',
        'person.last_name',
        'person.email'], function () {
        if ($scope.person.first_name && $scope.person.last_name &&  $scope.person.email) {
          $scope.submittable = true;
        } else if (!$scope.person.first_name || !$scope.person.last_name || !$scope.person.email) {
          $scope.submittable = false;
        }
      });


      $scope.createPerson = function(person) {
        var attr = {}
        attr.email = person.email
        attr.first_name = person.first_name
        attr.last_name = person.last_name
        attr.organization_id = $scope.organization.id;
        if (!$state.params.person_token) {
          People.create(attr).$promise.then(function(person){
            $scope.person = person;
            $state.go('organization_volunteer_registration.2', {person_token:btoa($scope.person.id)})
          })
        } else if ($state.params.person_token) {
          People.update(attr).$promise.then(function (person) {
            $scope.person = person;
            $state.go('organization_volunteer_registration.2', {person_token:btoa($scope.person.id)})
          })
        }
      };


      $scope.updateWithAddress = function(person) {
        var attr = {};
        attr.id = $scope.person.id;
        attr.address_1 = person.address_1;
        attr.address_2 = person.address_2;
        attr.state = person.state;
        attr.city = person.city;
        attr.zip_code = person.zip_code;
        People.update(attr).$promise.then(function(person){
          $scope.person = person;
          $state.go('organization_volunteer_registration.3', {person_token:btoa($scope.person.id)})
        })

      };

      $scope.morning = {};
      $scope.afternoon = {};
      $scope.night = {};

      $scope.updateWithSchedule = function() {
        var attr = {};
        attr.id = $scope.person.id;
        attr.schedule = {};
        attr.schedule.morning = $scope.morning;
        attr.schedule.afternoon = $scope.afternoon;
        attr.schedule.night = $scope.night;
        $scope.submitted = true;
        People.update(attr).$promise.then(function(person){
          $timeout(
            $state.go('volunteer_home'), 2500
          )
        });
      };





    })

  });

