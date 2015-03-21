'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.organizations
 * @description
 * # organizations
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
  .factory('PersonOpportunity', ['$resource', function($resource) {
    function PersonOpportunity() {
      this.service = $resource('/api/v1/person_opportunities/:person_opportunity_Id', //location of resource, tells it to look for ID
        {organization_Id: '@id'}, {update: {method: 'PATCH'}}); // sets ID variable, and update method (patch)
    }


    // Calls the create function located in app/controllers/organizations_controller.rb
    PersonOpportunity.prototype.create = function(attr) {
      return this.service.save(attr);
    };

    PersonOpportunity.prototype.update = function(attr) {
      return this.service.update(attr);
    }

    // Calls the destroy function located in app/controllers/communities_controller.rb
    PersonOpportunity.prototype.delete = function(oId) {
      return this.service.remove({person_opportunity_Id: oId});
    };

    // AngularJS will instantiate a singleton by calling "new" on this function
    return new PersonOpportunity;
  }]);
