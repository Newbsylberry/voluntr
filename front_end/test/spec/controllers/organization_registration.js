describe('OrganizationRegistrationCtrl', function () {

  var controller, scope, modalInstance, person, opportunity;
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    var person = {};
    var opportunity = {};
    $httpBackend = $injector.get('$httpBackend');
    scope = $rootScope.$new();
    controller = $controller('OrganizationRegistrationCtrl', {
      $scope: scope
    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
  }));


it("adds an organization", function(){
  var organization = {}
  organization.id = 3;
  organization.name = "Cabbage"
  organization.description = "blablabla"
  scope.addOrganization(organization);
})





});
