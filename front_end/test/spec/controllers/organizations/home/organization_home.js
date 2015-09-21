'use strict';

describe('Controller: OrganizationHomeCtrl', function () {

  var StaticPagesCtrl,
    scope,
    $httpBackend

  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    StaticPagesCtrl = $controller('OrganizationHomeCtrl', {
      $scope: scope,
      // place here mocked dependencies
    });
  }));

  it('$scope.loaded', function () {
    expect(scope.loaded).toBe(false)
  });

});
