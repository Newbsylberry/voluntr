'use strict';

describe('Controller: LandingPageOrganizationsCtrl', function () {

  // load the controller's module
  beforeEach(module('voluntrApp'));

  var LandingPageOrganizationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LandingPageOrganizationsCtrl = $controller('LandingPageOrganizationsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
