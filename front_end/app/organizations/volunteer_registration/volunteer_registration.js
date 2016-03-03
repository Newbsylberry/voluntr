angular.module('voluntrApp')
  .controller('OrganizationVolunteerRegistrationCtrl', function ($scope, $stateParams, $http,
                                                                 $state, $filter, $rootScope, Facebook,
                                                                 Organization, People, $timeout,
                                                                 OrganizationPerson) {


    Organization.get_by_url({organization_custom_Url: $stateParams.organization_custom_Url},
      function(successResponse) {
        // find the organizations information on facebook

        $scope.organization = successResponse;
        Facebook.api('/' + successResponse.fb_id + '/picture', {"type": "large"}, function (response) {
          $scope.organization.picture = response.data.url;
        });

        $scope.submittable = false;
        if ($state.params.token) {
          People.get({person_Id: atob($state.params.token)}, function(successResponse) {
            $scope.person = successResponse;
            console.log(successResponse)
            $scope.schedule = successResponse.schedule_update_form_settings;
            OrganizationPerson.get_by_organization_and_person_id(
              $scope.organization.id, $scope.person.id).$promise.then(function(successResponse) {
                $scope.organization_person = successResponse;
                $scope.person.notes = successResponse.notes;
              })
          })
        }
      });

    $scope.createPerson = function(person) {
      var attr = {};
      attr.email = person.email;
      attr.first_name = person.first_name;
      attr.last_name = person.last_name;
      attr.phone = person.phone;
      attr.organization_id = $scope.organization.id;
      if (!$state.params.token) {
        People.create(attr).$promise.then(function(person){
          $scope.person = person;
          $state.go('organization_volunteer_registration.2', {token:btoa($scope.person.id)})
        })
      } else if ($state.params.token) {
        People.update(attr).$promise.then(function (person) {
          $scope.person = person;
          $state.go('organization_volunteer_registration.2', {token:btoa($scope.person.id)})
        })
      }
    };

    if (!$scope.schedule) {
      $scope.schedule = {};
    }

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
        $state.go('organization_volunteer_registration.3', {token:btoa($scope.person.id)})
      })

    };

    $scope.updateWithSchedule = function() {
      var attr = {};
      attr.id = $scope.person.id;
      attr.schedule = $scope.schedule;
      People.update(attr).$promise.then(function(person){
        $state.go('organization_volunteer_registration.4', {token:btoa($scope.person.id)})
      });
    };

    $scope.updateWithAdditionalInformation = function(person) {
      var attr = {};
      attr.id = $scope.person.id;
      attr.phone = person.phone;
      attr.organization_name = person.organization_name;
      attr.occupation = person.occupation;
      if (person.notes) {
        var org_per_attr = {};
        org_per_attr.id = $scope.organization_person.id;
        org_per_attr.notes = person.notes;
        OrganizationPerson.update(org_per_attr)
      }
      People.update(attr).$promise.then(function(person){
        $state.go('organization_volunteer_registration.5', {token:btoa($scope.person.id)})
      });
    }

    $scope.occupations = ['Management','Sales','Accounting','Marketing','Information Technology','Medial','Engineering']
    $scope.referrers =
      [
        'Through a Friend',
        'Through Social Media',
        "Through Another Organization I'm Involved In",
        'Through A Religious Group',
        'Through Work',
        'Walked In One Day'
      ]
    $scope.demographic = {};
    $scope.demographic.birthday = new Date;

    $scope.demographicData = function(demographic){
      var attr = {};
      attr.date_of_birth = $scope.demographic.date_of_birth;
      attr.gender = $scope.demographic.gender;
      attr.occupation = $scope.demographic.occupation;
      attr.referred_from = $scope.demographic.referred_from;

    }

  });

