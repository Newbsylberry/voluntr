describe('CreateOpportunity', function () {

  var controller, scope;
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    $httpBackend = $injector.get('$httpBackend');
    scope = $rootScope.$new();
    controller = $controller('AddOpportunityCtrl', {
      $scope: scope
    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
  }));

  it("Should Equal Hello World", function() {
    expect(scope.greeting).toEqual("Hello World!")
  })

  it("Should run the function to create an opportunity", function() {
    scope.newOpportunity();
  })




});
