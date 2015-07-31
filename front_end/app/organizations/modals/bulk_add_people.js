/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('BulkAddPeopleCtrl', function ($scope, $modal, $http, $stateParams,
                                             searchService, $window, XLSXReaderService) {

    this.message = "Hello";

    $scope.showPreview = false;
    $scope.showJSONPreview = true;
    $scope.json_string = "";

    var prepareImport = function (person) {
      console.log(person)
    };



    $scope.fileChanged = function(files) {
        $scope.isProcessing = true;
        $scope.sheets = [];
        $scope.excelFile = files[0];
        XLSXReaderService.readFile($scope.excelFile, $scope.showPreview, $scope.showJSONPreview).then(function(xlsxData) {
            $scope.sheets = xlsxData.sheets;
          $scope.isProcessing = false;
        });
      };

    $scope.updateJSONString = function() {
      $scope.json_string = JSON.stringify($scope.sheets[$scope.selectedSheetName], null, 2);
      angular.forEach($scope.sheets[$scope.selectedSheetName], prepareImport)
    }

    $scope.showPreviewChanged = function() {
      if ($scope.showPreview) {
        $scope.showJSONPreview = false;
        $scope.isProcessing = true;
        XLSXReaderService.readFile($scope.excelFile, $scope.showPreview, $scope.showJSONPreview).then(function (xlsxData) {
          $scope.sheets = xlsxData.sheets;
          $scope.isProcessing = false;
        });
      }
    }



  });
