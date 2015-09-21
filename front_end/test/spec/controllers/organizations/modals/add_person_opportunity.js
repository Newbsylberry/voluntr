'use strict';

describe('Controller: AddOpportunityPersonCtrl', function () {

  var AddOpportunityPersonCtrl,
    modalInstance,
    scope,
    $httpBackend

  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    modalInstance = {                    // Create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    }
    AddOpportunityPersonCtrl = $controller('AddOpportunityPersonCtrl', {
      $scope: scope,
      person: {},
      opportunity: {},
      start_time: {_start:{_i:{}}},
      $modalInstance: modalInstance
      // place here mocked dependencies
    });
  }));

  it('$scope.addOpportunityPerson()', function () {
    scope.person = {};
    scope.addOpportunityPerson()
  });

});
