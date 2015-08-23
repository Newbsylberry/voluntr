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

    console.log(stickyNavTop);
    
    
   
    
    var stickyNav = function(){
      var scrollb = $('#screen2').offset().top;
        console.log(scrollb);
      if (scrollb < 0 ){
        $('.nav').addClass('sticky');
      } else {
        $('.nav').removeClass('sticky');
      };
    };
    stickyNav();



    $('.ng-scope').scroll(function() {
      console.log("HELLO COWBOY");
      stickyNav();
    });


    $('.fadein img:gt(0)').hide();
    setInterval(function(){
        $('.fadein :first-child').fadeOut()
          .next('img').fadeIn()
          .end().appendTo('.fadein');},
      4000);


    $(".screen1button").click(function(){
      $("#login").fadeIn(400);

    });


    $(".close").click(function(){
      $("#login").fadeOut(400);

    });

    $('.navicon').click(function(){
     
        $('.navmenu').toggleClass('navb');
      
    });

    
    $('.ng-scope').click(function(evn){
        evn.preventDefault();
        $('.container-fluid').scrollTo(this.hash, this.hash); 
        console.log('ddd');
    	});
    
    
    $('.navmenu a').click(function(){
      $('.navmenu').addClass('navb');
      console.log("menu close");
    });
    





    $scope.newContact = function () {
      $http.post('/api/v1/user/contact_form',
        {
          'email': $scope.newContact.contact_email,
          'content': $scope.newContact.contact_content
        }).
        success(function(data, status, headers, config) {
          alert('Thanks for Contacting Us, We Will Respond Soon!')
          $scope.newContact.contact_email = "";
          $scope.newContact.contact_content = "";

        }).
        error(function(data, status, headers, config) {
          alert('Thanks for Contacting Us, We Will Respond Soon!')
          $scope.newContact.contact_email = "";
          $scope.newContact.contact_content = "";
        });
    }

    $scope.open_lp_modal = function (size) {
      var profileModal = $modal.open(
        {
          templateUrl: 'views/tos_privacy.html',
          controller: 'LandingPageCtrl',
          size: size
        })

      profileModal.result.then(function () {
          $scope.profile.total_hours += $rootScope.recordedHours;
          $rootScope.recordedHours = null;
        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    };







  });
