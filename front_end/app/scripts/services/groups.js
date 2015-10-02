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
  .factory('Group', ['$resource', function($resource) {
    function Group() {
      this.service = $resource('/api/v1/groups/:group_Id', //location of resource, tells it to look for ID
        {
          group_Id: '@id'}, {
          update: {method: 'PATCH'},
          group_object: {method: 'GET', url:'/api/v1/groups/:group_Id/:object', isArray: true},
          // person_object: {method: 'GET', url:'/api/v1/people/:person_Id/:object', isArray: true}
        })}; // sets ID variable, and update method (patch)



    Group.prototype.get = function (id, successCallback, errorCallback) {
      return this.service.get(id, successCallback, errorCallback);
    };

    // Loads all Organization records served up at /api/organizations
    Group.prototype.all = function() {
      return this.service.query();
    };

    Group.prototype.create = function(attr) {
      return this.service.save(attr);
    }

    Group.prototype.people = function(gId, obj) {
      return this.service.group_object({group_Id: gId,object: obj})
    };

    Group.prototype.recorded_hours = function(gId, obj) {
      return this.service.group_object({group_Id: gId,object: obj})
    };

    Group.prototype.opportunities = function(gId, obj) {
      return this.service.group_object({group_Id: gId,object: obj})
    };


    Group.prototype.update = function(attr) {
      return this.service.update(attr);
    }

    return new Group

  }]);

