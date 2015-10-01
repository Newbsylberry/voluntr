describe('Controller: OpportunityDetailCtrl', function () {

  var controller, scope, modalInstance;
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    //modalInstance = {                    // Create a mock object using spies
    //  close: jasmine.createSpy('modalInstance.close'),
    //  dismiss: jasmine.createSpy('modalInstance.dismiss'),
    //  result: {
    //    then: jasmine.createSpy('modalInstance.result.then')
    //  }
    // }
    // $httpBackend = $injector.get('$httpBackend');
    scope = $rootScope.$new();
    controller = $controller('OpportunityDetailCtrl', {
      $scope: scope,
      $modalInstance: modalInstance
    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
    it("$scope.createOpportunityRole()", function() {
      scope.createOpportunityRole();
    })

    it("$scope.updateOpportunityRole()", function() {
      scope.updateOpportunityRole();
    })

    it("$scope.deleteOpportunityRole()", function() {
      var opportunity_role = {};
      scope.deleteOpportunityRole(opportunity_role);
    })

    it("$scope.deleteInstance()", function() {
      var date = "2015-07-15 21:54:30 -0600"
      scope.deleteOpportunityInstance(date);
    })


  }));





});
