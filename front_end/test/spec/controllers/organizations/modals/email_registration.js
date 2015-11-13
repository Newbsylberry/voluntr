'use strict';

describe('Controller: OrganizationRegistrationCtrl', function () {

  var EmailRegistrationCtrl,
    scope

  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    EmailRegistrationCtrl = $controller('OpportunitiesHomeCtrl', {
      $scope: scope



    })
  }))
  it('registers an organization and user email', function(){
    scope.register = {};
    scope.register.organization = "Volu";
    scope.register.email = "Chris@voluapp.com";
    scope.registerOrganization();
  })

  });
