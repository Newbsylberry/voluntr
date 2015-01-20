'use strict';

describe('Controller: AddeventcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('voluntrApp'));

  var AddeventcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddeventcontrollerCtrl = $controller('AddeventcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
