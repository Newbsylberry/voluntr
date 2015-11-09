'use strict';

describe('Controller: OpportunityRegistrationCtrl', function () {

  var OpportunityRegistrationCtrl,
    scope,
    modalInstance

  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    modalInstance = {close: jasmine.createSpy('$modalInstance.close()')},
    OpportunityRegistrationCtrl = $controller('OpportunityRegistrationCtrl', {
      $scope: scope,
      $modalInstance: modalInstance

      // place here mocked dependencies
    });
  }));

  it('$scope.registerForOpportunity', function () {
    scope.opportunityRegister = {};
    scope.registerForOpportunity();
  });

});
/**
 * Created by chrismccarthy on 9/1/15.
 */
