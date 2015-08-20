/**
 * Created by chrismccarthy on 8/18/15.
 */
'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.people
 * @description
 * # people
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
  .factory('GroupAdministrator', ['$resource', function($resource) {
    function GroupAdministrator() {
      this.service = $resource('/api/v1/group_administrators/:group_administrator_Id', //location of resource, tells it to look for ID
        {
          group_administrator_Id: '@id'}, {
          update: {method: 'PATCH'},
          // person_object: {method: 'GET', url:'/api/v1/people/:person_Id/:object', isArray: true}
        })}; // sets ID variable, and update method (patch)



    GroupAdministrator.prototype.get = function (id, successCallback, errorCallback) {
      return this.service.get(id, successCallback, errorCallback);
    };

    // Loads all Organization records served up at /api/organizations
    GroupAdministrator.prototype.all = function() {
      return this.service.query();
    };

    GroupAdministrator.prototype.create = function(attr) {
      return this.service.save(attr);
    }

    GroupAdministrator.prototype.update = function(attr) {
      return this.service.update(attr);
    }

    return new GroupAdministrator

  }]);

