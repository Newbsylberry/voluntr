'use strict';

describe('Controller: OpportunityHomeCtrl', function () {

  var OpportunityHomeCtrl,
    scope,
    modal

  // load the controller's module
  beforeEach(module('voluntrApp'));


  // Initialize the controller and a mock scope

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    modal = $injector.get('$modal')
    OpportunityHomeCtrl = $controller('OpportunitiesHomeCtrl', {
      $scope: scope,
      $modal: modal

      // place here mocked dependencies
    });
  }));

  it('$scope.opportunityDetail', function () {
    scope.opportunityDetail()
  });
});
/**
 * Created by chrismccarthy on 9/1/15.
 */
