'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.events
 * @description
 * # events
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
    .factory('Event', ['$resource', function($resource) {
        function Event() {
            this.service = $resource('/api/v1/events/:event_Id', //location of resource, tells it to look for ID
                {Event_Id: '@id'}, {update: {method: 'PATCH'}}); // sets ID variable, and update method (patch)
        }


        // Loads all Event records served up at /api/organizations
        Event.prototype.all = function() {
            return this.service.query();
        };

        // Loads a specific Event when the ID is passed in
        Event.prototype.get = function (id, successCallback, errorCallback) {
            return this.service.get(id, successCallback, errorCallback);
        };

        // Calls the create function located in app/controllers/organizations_controller.rb
        Event.prototype.create = function(attr) {
            return this.service.save(attr);
        };

        Event.prototype.update = function(attr) {
            return this.service.update(attr);
        }

        // Calls the destroy function located in app/controllers/communities_controller.rb
        Event.prototype.delete = function(eId) {
            return this.service.remove({event_Id: eId});
        };

        // AngularJS will instantiate a singleton by calling "new" on this function
        return new Event;
    }]);
