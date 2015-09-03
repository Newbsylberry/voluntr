describe('Controller: OrganizationVolunteerRegistrationCtrl', function() {
  var OrganizationVolunteerRegistrationCtrl,
    scope,
    People,
    Organization,
    $stateParams;

  beforeEach(module('voluntrApp'));

  beforeEach(inject(function($controller, $rootScope, $injector){
    scope = $rootScope.$new();
    People = {                    // Create a mock object using spies
      create: jasmine.createSpy('People.create()'),
      update: jasmine.createSpy('People.update()')
    }
    Organization = {                    // Create a mock object using spies
      get_by_url: jasmine.createSpy('Organization.get_by_url()'),
      getLoginStatus: jasmine.createSpy('Facebook.getLoginStatus()'),
      $promise: jasmine.createSpy('User.create().$promise')
    }
    $stateParams = $injector.get('$stateParams');
    OrganizationVolunteerRegistrationCtrl = $controller('OrganizationVolunteerRegistrationCtrl', {
      $scope: scope,
      People: People,
      $stateParams: $stateParams,
      Organization: Organization
    });
  }));

  describe('scope.createPerson(person)', function() {
    var person = {};


  });
});
