'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.people
 * @description
 * # people
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
  .factory('MailingServiceList', ['$resource', function($resource) {
    function MailingServiceList() {
      this.service = $resource('/api/v1/mailing_service_list/:mailing_service_list_Id', //location of resource, tells it to look for ID
        {
          mailing_service_list_Id: '@id'}, {
          update: {method: 'PATCH'},
          // person_object: {method: 'GET', url:'/api/v1/people/:person_Id/:object', isArray: true}
        })}; // sets ID variable, and update method (patch)



    MailingServiceList.prototype.get = function (id, successCallback, errorCallback) {
      return this.service.get(id, successCallback, errorCallback);
    };

    // Loads all Organization records served up at /api/organizations
    MailingServiceList.prototype.all = function() {
      return this.service.query();
    };

    MailingServiceList.prototype.update = function(attr) {
      return this.service.update(attr);
    }

    return new MailingServiceList

  }]);
