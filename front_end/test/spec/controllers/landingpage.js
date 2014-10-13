'use strict';

describe('Controller: LandingpageCtrl', function () {

  // load the controller's module
  beforeEach(module('voluntrApp'));

  var LandingpageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LandingpageCtrl = $controller('LandingpageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
