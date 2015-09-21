/**
 * Created by chrismccarthy on 9/1/15.
 */
'use strict';

describe('Controller: GenerateReportCtrl', function () {

  var GenerateReportCtrl,
    scope, modalInstance

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
    GenerateReportCtrl = $controller('GenerateReportCtrl', {
      $scope: scope,
      rm_id: {},
      type: {},
      $modalInstance: modalInstance
      // place here mocked dependencies
    });
  }));

  it('$scope.report_loaded', function () {
    expect(scope.report_loaded).toBe(false)
  });

  it('$scope.log_in()', function () {
    scope.exportReport();
  });

});

