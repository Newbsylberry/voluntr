'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.events
 * @description
 * # events
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
  .factory('OpportunityRole', ['$resource', function($resource) {
    function OpportunityRole() {
      this.service = $resource('/api/v1/opportunity_roles/:opportunity_role_Id', //location of resource, tells it to look for ID
        {
          opportunity_role_Id: '@id'}, {
          update: {method: 'PATCH'},
          OpportunityRole_object: {method: 'GET', url:'/api/v1/opportunities/:opportunity_role_Id/:object', isArray: true}

        })}; // sets ID variable, and update method (patch)



    // Loads all Event records served up at /api/organizations
    OpportunityRole.prototype.all = function() {
      return this.service.query();
    };

    // Loads a specific Event when the ID is passed in
    OpportunityRole.prototype.get = function (id, successCallback, errorCallback) {
      return this.service.get(id, successCallback, errorCallback);
    };

    // Calls the create function located in app/controllers/organizations_controller.rb
    OpportunityRole.prototype.create = function(attr) {
      return this.service.save(attr);
    };

    OpportunityRole.prototype.update = function(attr) {
      return this.service.update(attr);
    };

    // Calls the destroy function located in app/controllers/communities_controller.rb
    OpportunityRole.prototype.delete = function(oId) {
      return this.service.remove({opportunity_role_Id: oId});
    };

    // AngularJS will instantiate a singleton by calling "new" on this function
    return new OpportunityRole;
  }]);
