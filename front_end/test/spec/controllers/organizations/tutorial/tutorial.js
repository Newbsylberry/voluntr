'use strict';

describe('Controller: OrganizationTutorialCtrl', function () {

  var OrganizationTutorialCtrl,
    scope,
    Organization

  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    Organization = {                    // Create a mock object using spies
      authorization: jasmine.createSpy('Organization.authorization()'),
      getLoginStatus: jasmine.createSpy('Facebook.getLoginStatus()'),
      $promise: jasmine.createSpy('User.create().$promise')
    }
    scope = $rootScope.$new();
    OrganizationTutorialCtrl = $controller('OrganizationTutorialCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('$scope.backFunction()', function () {
    scope.back_link_state = "organizations.tutorial.5"
    scope.backFunction();
  });

  it('$scope.forwardFunction()', function () {
    scope.link_state = 'organizations.tutorial.5';
    scope.forwardFunction();
  });
});
