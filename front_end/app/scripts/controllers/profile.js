'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:ProfilectrlCtrl
 * @description
 * # ProfilectrlCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('ProfileCtrl', function ($scope, $log, $modal) {

        $scope.open = function (size) {
            var profileModal = $modal.open(
                {
                    templateUrl: 'views/record_hours.html',
                    controller: 'RecordHoursCtrl',
                    windowClass: 'record-hours-modal-window',
                    size: size
                })

            profileModal.result.then(function () {
                },
                function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
        };


    });
