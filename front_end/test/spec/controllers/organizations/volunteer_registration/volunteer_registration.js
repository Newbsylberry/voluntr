describe('OrganizationVolunteerRegistrationCtrl', function() {
  var controller, scope;
  beforeEach(module('voluntrApp'));

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    controller = $controller('OrganizationVolunteerRegistrationCtrl', {
      $scope: scope
    });
  }));

  describe('scope.createPerson(person)', function() {
    var person = {};
    // expect(scope.createPerson(person)).toBeDefined()
  });
});
