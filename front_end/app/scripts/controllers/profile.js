'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:ProfilectrlCtrl
 * @description
 * # ProfilectrlCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('ProfileCtrl', function ($scope, $log, $modal, Profile) {

        $scope.createProfile = function() {
            var attr = {};
            attr.user_id = localStorage.user.id;
            attr.first_name = $scope.createProfile.first_name;
            attr.last_name = $scope.createProfile.last_name;
            var newProfile = Profile.create(attr);
        };


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
