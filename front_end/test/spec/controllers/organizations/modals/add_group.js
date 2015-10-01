describe('AddGroup', function () {

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
    };
    scope.administrators = [];
    controller = $controller('AddGroupCtrl', {
      $scope: scope,
      $modalInstance: modalInstance
    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
  }));


  it("createAdministrator()", function() {
    scope.administrator = {};
    var person = {};
    person.email = "chris.s.mccarthy@gmail.com";
    person.first_name = "Chris";
    person.last_name = "McCarthy";
    scope.createAdministrator(person)
  })

  it("createGroup()", function() {
    var group = {};
    scope.createGroup.name = "new group";
    scope.createGroup.description = "A new group";
    scope.createGroup.city = "Syracuse";
    scope.createGroup.state = "New York";
    // scope.createGroup()
  })




});
