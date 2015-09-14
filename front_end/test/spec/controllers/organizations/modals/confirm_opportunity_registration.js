'use strict';

describe('Controller: OpportunityRegistrationConfirmationCtrl', function () {

  var OpportunityRegistrationConfirmationCtrl,
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
    OpportunityRegistrationConfirmationCtrl = $controller('OpportunityRegistrationConfirmationCtrl', {
      $scope: scope,
      $modalInstance: modalInstance
      // place here mocked dependencies
    });
  }));

  it('$scope.addOpportunityPerson()', function () {
    scope.cancel()
  });

});
