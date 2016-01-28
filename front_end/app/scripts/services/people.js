'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.people
 * @description
 * # people
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
  .factory('People', ['$resource', function($resource) {
    function People() {
      this.service = $resource('/api/v1/people/:person_Id', //location of resource, tells it to look for ID
        {
          person_Id: '@id'}, {
          update: {method: 'PATCH'},
          add_schedule: {method: 'PATCH', url: '/api/v1/people/:person_Id/add_schedule'},
          person_object: {method: 'GET', url:'/api/v1/people/:person_Id/:object', isArray: true}
        })}; // sets ID variable, and update method (patch)



    // Loads all Organization records served up at /api/organizations
    People.prototype.all = function() {
      return this.service.query();
    };

    // Loads a specific Organization when the ID is passed in
    People.prototype.get = function (id, successCallback, errorCallback) {
      return this.service.get(id, successCallback, errorCallback);
    };

    // Calls the create function located in app/controllers/organizations_controller.rb
    People.prototype.create = function(attr) {
      return this.service.save(attr);
    };

    People.prototype.update = function(attr) {
      return this.service.update(attr);
    }

    People.prototype.add_schedule = function(attr) {
      return this.service.add_schedule(attr);
    }

    // Calls the destroy function located in app/controllers/communities_controller.rb
    People.prototype.delete = function(pId) {
      return this.service.remove({person_Id: pId});
    };

    People.prototype.recorded_hours = function(pId, obj) {
      return this.service.person_object({person_Id: pId,object: obj})
    }

    People.prototype.opportunities = function(pId, obj) {
      return this.service.person_object({person_Id: pId,object: obj})
    }

    // AngularJS will instantiate a singleton by calling "new" on this function
    return new People;
  }]);
