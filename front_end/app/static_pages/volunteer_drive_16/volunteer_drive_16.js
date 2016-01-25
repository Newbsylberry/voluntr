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
  .controller('VolunteerDrive16Ctrl', function ($scope,$timeout,$state,$rootScope) {

    $scope.menu = false;

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
        if (toState.name !== 'volunteer_drive_16.menu') {
          $scope.menu = true;
        } if (toState.name === 'volunteer_drive_16.non_profits.form') {
        $scope.no_buttons = true;
        }
      })



    $scope.prod = {imagePaths: []};
    $scope.prod.imagePaths = [
      { custom: 'images/frat_council.png', thumbnail: 'images/frat_council.png' },
      { custom: 'images/young_leaders_united.jpg', thumbnail: 'images/young_leaders_united.jpg' },
      { custom: 'images/centerstate.png', thumbnail: 'images/centerstate.png'},
      { custom: 'images/believe_in_cuse.jpg', thumbnail: 'images/believe_in_cuse.jpg' },
      { custom: 'images/forty_below.png', thumbnail: 'images/forty_below.png' },
      { custom: 'images/onondaga_community_college.jpg', thumbnail: 'images/onondaga_community_college.jpg' },
      { custom: 'images/rha.jpg', thumbnail: 'images/rha.jpg' }
    ];

    $scope.introduction = true;
    $timeout(function(){
      $scope.introduction = false;
      $scope.loaded = true;
    }, 3000)



    $scope.formScreen = function() {
      $state.go('volunteer_drive_16.non_profits.form')
      $scope.no_buttons = true;
    }

    $scope.button_text = "How Does It Work?";

    $scope.changeState = function(screen) {
      if ($state.is('volunteer_drive_16.non_profits.1')){
        $state.go('volunteer_drive_16.non_profits.2');
        $scope.button_text = 'What Do I Get Out Of It?';
      } if ($state.is('volunteer_drive_16.non_profits.2')){
        $scope.button_text = "Alright, I'm Sold Where Do I Sign Up?"
        $state.go('volunteer_drive_16.non_profits.3')
      } if ($state.is('volunteer_drive_16.non_profits.3')){
        $state.go('volunteer_drive_16.non_profits.form')
      }
    };

  });

