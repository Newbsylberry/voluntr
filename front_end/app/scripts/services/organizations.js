'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.organizations
 * @description
 * # organizations
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
  .factory('Organization', ['$resource', function($resource) {
    function Organization() {
      this.service = $resource('/api/v1/organizations/:organization_Id', //location of resource, tells it to look for ID
        {
          organization_Id: '@id'}, {
          existence_check: {method: 'GET', url:'/api/v1/organizations/existence_check/:fb_id'},
          organization_object: {method: 'GET', url:'/api/v1/organizations/:organization_Id/:object', isArray: true},
          authorization: {method: 'GET', url:'/api/v1/organizations/:organization_Id/authorization'},
          update: {method: 'PATCH'}
        })}; // sets ID variable, and update method (patch)



    // Loads all Organization records served up at /api/organizations
    Organization.prototype.all = function() {
      return this.service.query();
    };

    // Loads a specific Organization when the ID is passed in
    Organization.prototype.get = function (id, successCallback, errorCallback) {
      return this.service.get(id, successCallback, errorCallback);
    };

    // Calls the create function located in app/controllers/organizations_controller.rb
    Organization.prototype.create = function(attr) {
      return this.service.save(attr);
    };

    Organization.prototype.update = function(attr) {
      return this.service.update(attr);
    }

    // Calls the destroy function located in app/controllers/communities_controller.rb
    Organization.prototype.delete = function(oId) {
      return this.service.remove({organization_Id: oId});
    };

    Organization.prototype.existence_check = function(fbId) {
      return this.service.existence_check({fb_id: fbId})
    };

    Organization.prototype.recorded_hours = function(oId, obj) {
      return this.service.organization_object({organization_Id: oId,object: obj})
    };

    Organization.prototype.daily_statistics = function(oId, obj) {
      return this.service.organization_object({organization_Id: oId,object: obj})
    };

    Organization.prototype.contact_volunteers = function(oId, obj) {
      return this.service.organization_object({organization_Id: oId,object: obj})
    };

    Organization.prototype.mail_chimp_check = function(oId, obj) {
      return this.service.organization_object({organization_Id: oId,object: obj})
    };

    Organization.prototype.people = function(oId, obj) {
      return this.service.organization_object({organization_Id: oId,object: obj})
    };

    Organization.prototype.posts = function(oId, obj) {
      return this.service.organization_object({organization_Id: oId,object: obj})
    };

    Organization.prototype.authorization = function(oauth, organization_id) {
      return this.service.authorization({organization_Id: organization_id, oauth: oauth})
    };



    // AngularJS will instantiate a singleton by calling "new" on this function
    return new Organization;
  }]);
