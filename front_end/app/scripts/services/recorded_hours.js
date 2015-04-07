angular.module('voluntrApp')
  .factory('RecordedHours', ['$resource', function($resource) {
    function RecordedHours() {
      this.service = $resource('/api/v1/recorded_hours/:recorded_hours_Id', //location of resource, tells it to look for ID
        {organization_Id: '@id'}, {update: {method: 'PATCH'}}); // sets ID variable, and update method (patch)
    }


    // Loads all Organization records served up at /api/organizations
    RecordedHours.prototype.all = function() {
      return this.service.query();
    };

    // Loads a specific Organization when the ID is passed in
    RecordedHours.prototype.get = function (id, successCallback, errorCallback) {
      return this.service.get(id, successCallback, errorCallback);
    };

    // Calls the create function located in app/controllers/organizations_controller.rb
    RecordedHours.prototype.create = function(attr) {
      return this.service.save(attr);
    };

    RecordedHours.prototype.update = function(attr) {
      return this.service.update(attr);
    }

    // Calls the destroy function located in app/controllers/communities_controller.rb
    RecordedHours.prototype.delete = function(rId) {
      return this.service.remove({person_Id: rId});
    };

    // AngularJS will instantiate a singleton by calling "new" on this function
    return new RecordedHours;
  }]);
