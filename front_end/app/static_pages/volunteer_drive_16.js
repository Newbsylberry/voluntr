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
    }, 3000)



    $scope.formScreen = function() {
      $state.go('volunteer_drive_16.form')
      $scope.no_buttons = true;
    }

    $scope.button_text = "How Does It Work?";

    $scope.changeState = function(screen) {
      if ($state.is('volunteer_drive_16.1')){
        $state.go('volunteer_drive_16.2');
        $scope.button_text = 'What Do I Get Out Of It?';
      } if ($state.is('volunteer_drive_16.2')){
        $scope.button_text = "Alright, I'm Sold Where Do I Sign Up?"
        $state.go('volunteer_drive_16.3')
      } if ($state.is('volunteer_drive_16.3')){
        $state.go('volunteer_drive_16.form')
        $scope.no_buttons = true;
      }
    };

  });

