'use strict';

describe('Controller: LandingPageVolunteerCtrl', function () {

  // load the controller's module
  beforeEach(module('voluntrApp'));

  var LandingPageVolunteerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LandingPageVolunteerCtrl = $controller('LandingPageVolunteerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
