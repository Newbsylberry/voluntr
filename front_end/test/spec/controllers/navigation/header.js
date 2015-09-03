'use strict';

describe('Controller: HeaderCtrl', function () {

  var HeaderCtrl,
    scope

  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    HeaderCtrl = $controller('HeaderCtrl', {
      $scope: scope,
      $modal: $injector.get('$modal')
      // place here mocked dependencies
    });
  }));

  it('$scope.supportModal', function () {
    scope.supportModal()
  });

  it('$scope.open', function () {
    scope.open()
  });

  it('$scope.open', function () {
    scope.open()
  });

  it('$scope.close', function () {
    scope.close()
  });

  it('$scope.openModal', function () {
    var result = {}
    scope.openModal(result)
  });
});
