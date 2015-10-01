/**
 * Created by chrismccarthy on 10/1/15.
 */
'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.organizations
 * @description
 * # organizations
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
  .factory('OrganizationPerson', ['$resource', function($resource) {
    function OrganizationPerson() {
      this.service = $resource('/api/v1/organization_people/:organization_person_Id', //location of resource, tells it to look for ID
        {
          organization_person_Id: '@id'}, {
          get_by_organization_and_person_id: {method: 'GET', url:'/api/v1/organization_people/:organization_Id/:person_Id'},
          update: {method: 'PATCH'}
        })}; // sets ID variable, and update method (patch)



    // Loads all Organization records served up at /api/organizations
    OrganizationPerson.prototype.all = function() {
      return this.service.query();
    };

    // Loads a specific Organization when the ID is passed in
    OrganizationPerson.prototype.get_by_organization_and_person_id = function (oId, pId) {
      return this.service.get_by_organization_and_person_id({organization_Id: oId,person_Id: pId});
    };

    OrganizationPerson.prototype.update = function(attr) {
      return this.service.update(attr);
    };


    // AngularJS will instantiate a singleton by calling "new" on this function
    return new OrganizationPerson;
  }]);

