describe('BulkAddPeople', function () {

  var controller, scope;
  beforeEach(module('voluntrApp'));
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('BulkAddPeopleCtrl', {
      $scope: scope
    });
  }));




});
