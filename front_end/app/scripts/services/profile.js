'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.organizations
 * @description
 * # organizations
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
    .factory('Profile', ['$resource', function($resource) {
        function Profile() {
            this.service = $resource('/api/v1/profiles/:profile_Id', //location of resource, tells it to look for ID
                {organization_Id: '@id'}, {update: {method: 'PATCH'}}); // sets ID variable, and update method (patch)
        }


        // Loads all Organization records served up at /api/organizations
        Profile.prototype.all = function() {
            return this.service.query();
        };

        // Loads a specific Organization when the ID is passed in
        Profile.prototype.get = function (id, successCallback, errorCallback) {
            return this.service.get(id, successCallback, errorCallback);
        };

        // Calls the create function located in app/controllers/organizations_controller.rb
        Profile.prototype.create = function(attr) {
            return this.service.save(attr);
        };

        Profile.prototype.update = function(attr) {
            return this.service.update(attr);
        }

        // Calls the destroy function located in app/controllers/communities_controller.rb
        Profile.prototype.delete = function(pId) {
            return this.service.remove({profile_Id: pId});
        };

        // AngularJS will instantiate a singleton by calling "new" on this function
        return new Profile;
    }]);
