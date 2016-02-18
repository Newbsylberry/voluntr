'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:VolunteerhomeCtrl
 * @description
 * # VolunteerhomeCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('ExportVolunteerReportCtrl', function ($scope,$http) {

    $scope.date = {};

    $scope.sendReport = function(){
      $http.get('api/v1/reports/public/person',
        {
          params: {
            start_date: $scope.date.startDate,
            end_date: $scope.date.endDate,
            email: $scope.email_address
          }
        }).success(function(data){
          $scope.report_sent = true;
        });
    }
  });

