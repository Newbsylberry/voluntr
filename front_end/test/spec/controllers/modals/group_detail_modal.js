describe('GroupDetailCtrl', function () {

  var controller, scope, modalInstance, id;
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    modalInstance = {                    // Create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };
    id = 1;
    scope = $rootScope.$new();
    controller = $controller('GroupDetailCtrl', {
      $scope: scope,
      $modalInstance: modalInstance,
      id: id
    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
  }));

  it("load", function() {

  })

});
