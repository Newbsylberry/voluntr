'use strict';

describe('Controller: OrganizationRegistrationCtrl', function () {

  var StaticPagesCtrl,
    scope,
    $httpBackend,
    Facebook,
    Organization

  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    Facebook = {                    // Create a mock object using spies
      login: jasmine.createSpy('Facebook.login()'),
      getLoginStatus: jasmine.createSpy('Facebook.getLoginStatus()'),
      api: jasmine.createSpy('Facebook.api()'),
      $promise: jasmine.createSpy('User.create().$promise')
    };
    Organization = {                    // Create a mock object using spies
      authorization: jasmine.createSpy('Organization.authorization()'),
      getLoginStatus: jasmine.createSpy('Facebook.getLoginStatus()'),
      $promise: jasmine.createSpy('Organization.create().$promise')
    }
    scope = $rootScope.$new();
    StaticPagesCtrl = $controller('OrganizationRegistrationCtrl', {
      $scope: scope,
      // place here mocked dependencies
      Facebook: Facebook
    });
  }));

  it('$scope.log_in()', function () {
    scope.log_in()
  });

  it('$scope.authorizeUser()', function () {
    var organization = {};
    scope.authorizeUser(organization)
  });

  it('$scope.addOrganization()', function () {
    var organization = {};
    scope.addOrganization(organization)
  });

  it('$scope.organizationRegistration()', function () {
    var organization = {};
    scope.organizationRegistration(organization)
  });
});
