describe('Controller: EditScheduleCtrl', function () {

  var EditScheduleCtrl,
    scope,
    modalInstance;
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    modalInstance = {                    // Create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };
    scope = $rootScope.$new();
    EditScheduleCtrl = $controller('EditScheduleCtrl', {
      $scope: scope,
      $modalInstance: modalInstance
    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
  }));

  it("load", function() {
    expect(EditScheduleCtrl).toBeDefined()
  })

  it("$scope.updateSchedule()", function() {
    scope.calendar = {};
    scope.calendar.repeat = {}
    scope.updateSchedule()
  })

});
