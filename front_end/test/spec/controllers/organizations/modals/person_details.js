'use strict';

describe('Controller: OrganizationRegistrationCtrl', function () {

  var PersonDetailCtrl,
    scope,
    $httpBackend


  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    PersonDetailCtrl = $controller('PersonDetailCtrl', {
      $scope: scope,
      id: {}
      // place here mocked dependencies

    });
  }));

  it('loads controller', function () {
    expect(PersonDetailCtrl).toBeDefined()
  });
});
