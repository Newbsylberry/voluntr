describe('AddPerson', function () {

  var controller, scope, modalInstance;
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    modalInstance = {                    // Create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    }
    controller = $controller('AddPeopleCtrl', {
      $scope: scope,
      $modalInstance: modalInstance
    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
  }));


  it("Should run the function to create a person", function() {
    scope.addPerson();
  })




});
