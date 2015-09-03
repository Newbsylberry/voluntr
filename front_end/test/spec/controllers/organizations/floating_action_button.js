'use strict';

describe('Controller: FABCtrl', function () {

  var StaticPagesCtrl,
    scope,
    $httpBackend,
    Facebook,
    Organization

  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    StaticPagesCtrl = $controller('FABCtrl', {
      $scope: scope,
      // place here mocked dependencies
      $modal: $injector.get('$modal')
    });
  }));

  it('$scope.addVolunteerOpportunity', function () {
    scope.addVolunteerOpportunity()
  });

  it('$scope.recordHours', function () {
    scope.recordHours()
  });
  it ('$scope.addOrganizationPerson()', function(){
    scope.addOrganizationPerson()
  })
  it ('$scope.addGroup()', function() {
    scope.addGroup()
  })
});
