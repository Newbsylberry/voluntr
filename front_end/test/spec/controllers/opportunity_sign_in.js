describe('AddPerson', function () {

  var controller, scope;
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope, $injector) {

    $httpBackend = $injector.get('$httpBackend');
    scope = $rootScope.$new();
    scope.opportunity = {};
    scope.opportunity.organization_id = 6;
    controller = $controller('OpportunitySignInCtrl', {
      $scope: scope

    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
  }));


  it("Run the function to sign a user in", function() {
    scope.signInForOpportunity();
  })




});
