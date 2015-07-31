'use strict';

/**
 * @ngdoc service
 * @name chronicleMeApp.User
 * @description
 * # User
 * Service in the chronicleMeApp.
 */
angular.module('voluntrApp')
    .factory('User', ['$resource', function($resource) {
        function User () {
            this.service = $resource('/api/v1/users/:user_Id', //location of resource, tells it to look for ID
                {user_Id: '@id'}, {update: {method: 'PATCH'}}); // sets ID variable, and update method (patch)
        };

        User.prototype.get = function(id, successCallback, errorCallback) {
            this.service.get(id, successCallback, errorCallback);
        };

        User.prototype.update = function(attr) {
            return this.service.update(attr);
        }

        return new User;
    // AngularJS will instantiate a singleton by calling "new" on this function
  }]);
