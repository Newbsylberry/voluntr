'use strict';

describe('Controller: OrganizationHomeCtrl', function () {

  // load the controller's module
  beforeEach(module('voluntrApp'));

  var OrganizationHomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrganizationHomeCtrl = $controller('OrganizationHomeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
