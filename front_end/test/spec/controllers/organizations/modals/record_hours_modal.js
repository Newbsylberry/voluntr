describe('RecordHoursCtrl', function () {

  var RecordHoursCtrl,
    scope,
    modalInstance
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    modalInstance = {                    // Create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    }
    $httpBackend = $injector.get('$httpBackend');
    scope = $rootScope.$new();
    RecordHoursCtrl = $controller('RecordHoursCtrl', {
      $scope: scope,
      $modalInstance: modalInstance
    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
  }));


  it("Records a users hours", function() {
    scope.recordHours();
  })

  it("$scope.clearPerson()", function() {
    scope.clearPerson()
  }) 




});
