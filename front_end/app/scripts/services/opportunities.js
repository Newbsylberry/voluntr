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
                {opportunity_Id: '@id'}, {update: {method: 'PATCH'}}); // sets ID variable, and update method (patch)
        }


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

        Opportunity.prototype.update = function(attr) {
            return this.service.update(attr);
        }

        // Calls the destroy function located in app/controllers/communities_controller.rb
        Opportunity.prototype.delete = function(oId) {
            return this.service.remove({opportunity_Id: oId});
        };

        // AngularJS will instantiate a singleton by calling "new" on this function
        return new Opportunity;
    }]);
