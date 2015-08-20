describe('GroupsHomeCtrl', function () {

  var controller, scope;
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    var person = {};
    var opportunity = {};
    $httpBackend = $injector.get('$httpBackend');
    scope = $rootScope.$new();
    controller = $controller('GroupsHomeCtrl', {
      $scope: scope
    });
    // scope.calendar.start_time = 'Sun May 31 2015 14:57:34 GMT-0400'
  }));


  it("$scope.groups", function(){
    scope.groups;
  })





});
