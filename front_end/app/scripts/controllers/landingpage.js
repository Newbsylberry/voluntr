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
                                           $window, $anchorScroll, $document) {


    // Set the height and width
    $scope.window_height = window.innerHeight;
    $scope.window_width = window.innerWidth;

    $(window).resize(function(){
      $scope.$apply(function(){
        $scope.window_height = $window.innerHeight;
        $scope.window_width = $window.innerWidth;
      });
    });

    var top = 400;
    var duration = 1000; //milliseconds

    //Scroll to the exact position
    $scope.goToSection = function (section) {
      var offset = 225; //pixels; adjust for floating menu, context etc
      //Scroll to #some-id with 30 px "padding"
      //Note: Use this in a directive, not with document.getElementById
      var someElement = angular.element(document.getElementById(section));
      $document.scrollToElement(someElement, offset, duration);
    }


    $scope.organizationslide = 'organization-1';
    $scope.organization_slide = function(organizationsection) {
      console.log(organizationsection)
      $scope.organizationslide = organizationsection;

    }

    $scope.contactslide = 'contact-1';
    $scope.contact_slide = function(contactsection) {
      console.log(contactsection)
      $scope.contactslide = contactsection;

    }
    $scope.organizationLogIn = function () {
      Facebook.getLoginStatus(function(response) {
        if(response.status === 'connected') {
          $scope.facebook_token = response.authResponse.accessToken;
          $state.go('landing_page.organization_landing')
        }
        else if (response.status !== 'connected') {
          Facebook.login(function(response) {
              Facebook.api('/me/accounts', function(response) {
                $scope.facebook_token = response.authResponse.accessToken;
              });
              // Do something with response.
            }, {scope: ['manage_pages', 'user_groups']}
          );
          $state.go('landing_page.organization_landing')
        };
      });
      console.log($scope.organizations)

    };

    $scope.newContact = function () {
      $http.post('/api/v1/user/contact_form',
      {
        'email': $scope.newContact.contact_email,
        'content': $scope.newContact.contact_content
        }).
        success(function(data, status, headers, config) {
          alert('Thanks for Contacting Us, We Will Respond Soon!')

        }).
        error(function(data, status, headers, config) {
          alert('Thanks for Contacting Us, We Will Respond Soon!')
        });
    }



    //var ttg = new google.maps.LatLng('43.044622', '-76.150299');
    //
    //$scope.$on('mapInitialized', function(event, map) {
    //  map.setCenter(ttg)
    //});







  });
