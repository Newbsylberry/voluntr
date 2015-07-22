/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('GenerateReportCtrl', function ($scope, $modal, $rootScope, $http,
                                              $stateParams, $window, rm_id, $window) {



    $scope.date = {startDate: null, endDate: null};

    $scope.report_loaded = false;


    $scope.exportReport = function() {
      $scope.report_loaded = true;
      var tabWindowId = window.open('about:blank', '_blank')
      $http.get('api/v1/reports/opportunities/' + rm_id,
        {
          params: {
            start_date: $scope.date.startDate,
            end_date: $scope.date.endDate
          },
        headers: {
        'Content-Type': 'application/pdf'
      }
        }).success(function(data){

          tabWindowId.location.href = data.resource.resource.url;

        });
    };




  });
