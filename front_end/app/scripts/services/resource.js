'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.people
 * @description
 * # people
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
  .factory('Resource', ['$resource', function($resource) {
    function Resource() {
      this.service = $resource('/api/v1/resources/:resource_Id', //location of resource, tells it to look for ID
        {
          resource_Id: '@id'}, {
          update: {method: 'PATCH'}
        })}; // sets ID variable, and update method (patch)rails



    // Loads all Organization records served up at /api/organizations
    Resource.prototype.all = function() {
      return this.service.query();
    };

    // Loads a specific Organization when the ID is passed in
    Resource.prototype.get = function (id, successCallback, errorCallback) {
      return this.service.get(id, successCallback, errorCallback);
    };

    Resource.prototype.update = function(attr) {
      return this.service.update(attr);
    }


    // Calls the destroy function located in app/controllers/communities_controller.rb
    Resource.prototype.delete = function(rId) {
      return this.service.remove({resource_Id: rId});
    };



    // AngularJS will instantiate a singleton by calling "new" on this function
    return new Resource;
  }]);
