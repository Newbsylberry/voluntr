'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingpageCtrl
 * @description
 * # LandingpageCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('LandingPageCtrl', function ($scope, Facebook, Organization,
                                           $http, $state, Auth, $rootScope, $location,
                                           $window, $modal) {


    var stickyNavTop = $('.nav').offset().top;
    var stickyNav = function(){
      var scrollTop = $(window).scrollTop();
      if (scrollTop > stickyNavTop) {
        $('.nav').addClass('sticky');
      } else {
        $('.nav').removeClass('sticky');
      }
    };
    stickyNav();



    $(window).scroll(function() {

      stickyNav();
    });
    $('.fadein img:gt(0)').hide();
    setInterval(function(){
        $('.fadein :first-child').fadeOut()
          .next('img').fadeIn()
          .end().appendTo('.fadein');},
      4000);


    $(".close").click(function(){
        $("#login").fadeOut(400);

      });



      $(".navmenu a").click(function(evn){
        evn.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash);
      });







  });
