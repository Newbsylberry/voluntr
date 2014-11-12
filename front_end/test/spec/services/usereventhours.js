'use strict';

describe('Service: UserEventHours', function () {

  // load the service's module
  beforeEach(module('voluntrApp'));

  // instantiate service
  var UserEventHours;
  beforeEach(inject(function (_UserEventHours_) {
    UserEventHours = _UserEventHours_;
  }));

  it('should do something', function () {
    expect(!!UserEventHours).toBe(true);
  });

});
