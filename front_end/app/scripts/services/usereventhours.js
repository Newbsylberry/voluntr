'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.organizations
 * @description
 * # organizations
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
    .factory('UserEventHours', ['$resource', function($resource) {
        function UserEventHours() {
            this.service = $resource('/api/v1/user_event_hours/:user_event_hours_Id', //location of resource, tells it to look for ID
                {organization_Id: '@id'}, {update: {method: 'PATCH'}}); // sets ID variable, and update method (patch)
        }


        // Loads all Organization records served up at /api/organizations
        UserEventHours.prototype.all = function() {
            return this.service.query();
        };

        // Loads a specific Organization when the ID is passed in
        UserEventHours.prototype.get = function (id, successCallback, errorCallback) {
            return this.service.get(id, successCallback, errorCallback);
        };

        // Calls the create function located in app/controllers/organizations_controller.rb
        UserEventHours.prototype.create = function(attr) {
            return this.service.save(attr);
        };

        UserEventHours.prototype.update = function(attr) {
            return this.service.update(attr);
        }

        // Calls the destroy function located in app/controllers/communities_controller.rb
        UserEventHours.prototype.delete = function(oId) {
            return this.service.remove({user_event_hours_Id: oId});
        };

        // AngularJS will instantiate a singleton by calling "new" on this function
        return new UserEventHours;
    }]);