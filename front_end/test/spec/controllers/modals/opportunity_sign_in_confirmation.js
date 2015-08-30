describe('AddPerson', function () {

  var controller, scope, modalInstance, person, opportunity;
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    modalInstance = {                    // Create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    }
    var person = {};
    var opportunity = {};
    $httpBackend = $injector.get('$httpBackend');
    scope = $rootScope.$new();
    controller = $controller('OpportunitySignInConfirmationCtrl', {
      $scope: scope,
      $modalInstance: modalInstance,
      person: person,
      opportunity: opportunity
    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
  }));

  it("$scope.searching", function() {
    var opportunity_role = {};
    // expect(scope.searching).toBe(false)
  })

  it("Records a users hours", function() {
    scope.timeDuration();
  })




});
