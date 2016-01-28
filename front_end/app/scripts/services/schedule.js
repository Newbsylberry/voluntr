'use strict';

/**
 * @ngdoc service
 * @name voluntrApp.organizations
 * @description
 * # organizations
 * Service in the voluntrApp.
 */
angular.module('voluntrApp')
  .factory('Schedule', ['$resource', function($resource) {
    function Schedule() {
      this.service = $resource('/api/v1/schedules/format/schedule_string'); // sets ID variable, and update method (patch)
    }

    Schedule.prototype.schedule_string = function(params, successCallback, errorCallback) {
      return this.service.get(params, successCallback, errorCallback)
    }



    // AngularJS will instantiate a singleton by calling "new" on this function
    return new Schedule;
  }]);
