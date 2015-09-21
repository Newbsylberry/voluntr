'use strict';

describe('Controller: OrganizationAccountCtrl', function () {

  var StaticPagesCtrl,
    scope,
    $httpBackend

  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    StaticPagesCtrl = $controller('OrganizationAccountCtrl', {
      $scope: scope,
      // place here mocked dependencies
    });
  }));

  it('$scope.delete()', function () {
    var mailing_service = {};
    scope.organization = {};
    scope.organization.organization_mailing_services = [];
    scope.delete(mailing_service)
    expect(scope.mailchimp_authorized).toBe(false)
  });

});
