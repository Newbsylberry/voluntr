/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('GenerateReportCtrl', function ($scope, $modal, $rootScope, $http,
                                              $stateParams, rm_id, $window, type, $modalInstance) {

    $scope.date = {startDate: null, endDate: null};
    $scope.report_loaded = false;


    $scope.exportReport = function() {
      $scope.report_loaded = true;
      var tabWindowId = window.open('about:blank', '_blank');
      if (type === 'opportunity') {
        $http.get('api/v1/reports/opportunity/' + rm_id,
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
      } else if (type == 'person') {
        $http.get('api/v1/reports/person/' + rm_id,
          {
            params: {
              start_date: $scope.date.startDate,
              end_date: $scope.date.endDate,
              organization_id: $stateParams.organization_Id
            },
            headers: {
              'Content-Type': 'application/pdf'
            }
          }).success(function(data){
            console.log(data)
            tabWindowId.location.href = data.resource.resource.url;
          });
      }
      $modalInstance.close();
    };




  });
