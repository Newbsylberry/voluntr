describe('Controller: SupportFormCtrl', function () {

  var SupportFormCtrl,
    scope,
    modalInstance,
    http
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    modalInstance = {                    // Create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };
    http = {
      post: jasmine.createSpy("http.post")
    }
    scope = $rootScope.$new();
    SupportFormCtrl = $controller('SupportFormCtrl', {
      $scope: scope,
      $modalInstance: modalInstance,
      current_state: {},
      $http: http
    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
  }));

  it("load", function() {
    expect(SupportFormCtrl).toBeDefined()
  })

  //it ("scope.submitFeedback()", function(){
  //  scope.submitFeedback();
  //})


});
