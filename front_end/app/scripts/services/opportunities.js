'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.events
 * @description
 * # events
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
  .factory('Opportunity', ['$resource', function($resource) {
    function Opportunity() {
      this.service = $resource('/api/v1/opportunities/:opportunity_Id', //location of resource, tells it to look for ID
        {
          opportunity_Id: '@id'}, {
          update: {method: 'PATCH'},
          update_schedule: {method: 'PATCH', url:'/api/v1/opportunities/:opportunity_Id/update_schedule'},
          opportunity_object: {method: 'GET', url:'/api/v1/opportunities/:opportunity_Id/:object', isArray: true},
          delete_instance: {method: 'DELETE', url:'/api/v1/opportunities/:opportunity_Id/delete_instance'},
          delete_future_instances: {method: 'DELETE', url:'/api/v1/opportunities/:opportunity_Id/delete_future_instances'}
        })}; // sets ID variable, and update method (patch)



    // Loads all Event records served up at /api/organizations
    Opportunity.prototype.all = function() {
      return this.service.query();
    };

    // Loads a specific Event when the ID is passed in
    Opportunity.prototype.get = function (id, successCallback, errorCallback) {
      return this.service.get(id, successCallback, errorCallback);
    };

    // Calls the create function located in app/controllers/organizations_controller.rb
    Opportunity.prototype.create = function(attr) {
      return this.service.save(attr);
    };

    Opportunity.prototype.instance_statistics = function(oId, obj) {
      return this.service.opportunity_object({opportunity_Id: oId,object: obj})
    };

    Opportunity.prototype.volunteers = function(oId, obj) {
      return this.service.opportunity_object({opportunity_Id: oId,object: obj})
    };

    Opportunity.prototype.recorded_hours = function(oId, obj) {
      return this.service.opportunity_object({opportunity_Id: oId,object: obj})
    };

    Opportunity.prototype.roles = function(oId, obj) {
      return this.service.opportunity_object({opportunity_Id: oId,object: obj})
    };


    Opportunity.prototype.update = function(attr) {
      return this.service.update(attr);
    };

    Opportunity.prototype.update_schedule = function(attr) {
      return this.service.update_schedule(attr);
    };

    // Calls the destroy function located in app/controllers/communities_controller.rb
    Opportunity.prototype.delete = function(oId) {
      return this.service.remove({opportunity_Id: oId});
    };

    Opportunity.prototype.delete_instance = function(oId, date) {
      return this.service.delete_instance({opportunity_Id: oId,date: date})
    };

    Opportunity.prototype.delete_future_instances = function(oId, date) {
      return this.service.delete_future_instances({opportunity_Id: oId,date: date})
    };


    // AngularJS will instantiate a singleton by calling "new" on this function
    return new Opportunity;
  }]);
