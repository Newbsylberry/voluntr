describe('Controller: PeopleHomeCtrl', function () {

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
    $modal = $injector.get("$modal")
    controller = $controller('PeopleHomeCtrl', {
      $scope: scope,
      $modalInstance: modalInstance
    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
  }));


  it("scope.bulkAddPeople()", function() {
    scope.bulkAddPeople()
  })




});
