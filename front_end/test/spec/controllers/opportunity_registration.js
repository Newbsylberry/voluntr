describe('RegistrationFormCtrl', function () {

  var controller, scope;
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('OpportunityRegistrationCtrl', {
      $scope: scope
    });
  }));




});
