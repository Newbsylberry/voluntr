'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.people
 * @description
 * # people
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
  .factory('OrganizationMailingService', ['$resource', function($resource) {
    function OrganizationMailingService() {
      this.service = $resource('/api/v1/organization_mailing_services/:organization_mailing_service_Id', //location of resource, tells it to look for ID
        {
          organization_mailing_service_Id: '@id'}, {
          update: {method: 'PATCH'},
          // person_object: {method: 'GET', url:'/api/v1/people/:person_Id/:object', isArray: true}
        })}; // sets ID variable, and update method (patch)



    OrganizationMailingService.prototype.get = function (id, successCallback, errorCallback) {
      return this.service.get(id, successCallback, errorCallback);
    };

    // Loads all Organization records served up at /api/organizations
    OrganizationMailingService.prototype.all = function() {
      return this.service.query();
    };

    OrganizationMailingService.prototype.update = function(attr) {
      return this.service.update(attr);
    };

    // Calls the destroy function located in app/controllers/communities_controller.rb
    OrganizationMailingService.prototype.delete = function(oId) {
      return this.service.remove({organization_mailing_service_Id: oId});
    };

    return new OrganizationMailingService

  }]);
