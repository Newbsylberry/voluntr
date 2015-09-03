'use strict';

describe('Controller: OrganizationRegistrationCtrl', function () {

  var SideMenuCtrl,
    scope,
    $httpBackend

  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    SideMenuCtrl = $controller('SideMenuCtrl', {
      $scope: scope,
      // place here mocked dependencies

    });
  }));

  it('$scope.isOpen', function () {
    expect(scope.isOpen).toBe(false)
  });
});
