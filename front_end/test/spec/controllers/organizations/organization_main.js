'use strict';

describe('Controller: OrganizationMainCtrl', function () {

  var StaticPagesCtrl,
    scope,
    $httpBackend

  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    StaticPagesCtrl = $controller('OrganizationMainCtrl', {
      $scope: scope,
      // place here mocked dependencies
    });
  }));

  //it('$scope.log_in()', function () {
  //  scope.log_in()
  //});

});
