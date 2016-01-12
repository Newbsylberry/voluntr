/**
 * Created by chrismccarthy on 1/11/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingpageCtrl
 * @description
 * # LandingpageCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('VolunteerDrive16Ctrl', function ($scope,$timeout,$state) {

    $scope.introduction = true;
    $timeout(function(){
       $scope.introduction = false;
       $scope.loaded = true;
    }, 2500)

    if ($state.is('volunteer_drive_16.form')){
      $scope.no_buttons = true;
    }

    $scope.formScreen = function() {
      $state.go('volunteer_drive_16.form')
      $scope.no_buttons = true;
    }

    $scope.changeState = function(screen) {
      if ($state.is('volunteer_drive_16.1')){
        $state.go('volunteer_drive_16.2')
      } if ($state.is('volunteer_drive_16.2')){
        $state.go('volunteer_drive_16.3')
      } if ($state.is('volunteer_drive_16.3')){
        $state.go('volunteer_drive_16.4')
      } if ($state.is('volunteer_drive_16.3')){
        $state.go('volunteer_drive_16.form')
      }
    }




  });

