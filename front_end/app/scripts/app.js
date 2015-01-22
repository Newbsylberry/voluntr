'use strict';

/**
 * @ngdoc overview
 * @name voluntrApp
 * @description
 * # voluntrApp
 *
 * Main module of the application.
 */
angular
  .module('voluntrApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'facebook',
    'ui.bootstrap',
    'ui.router',
    'duScroll',
    'ngMaterial',
    'ngMap',
    'Devise',
    'geolocation',
    'highcharts-ng',
    "kendo.directives"
  ])

  //.run(['$anchorScroll', function($anchorScroll) {
  //  $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
  //}])




  .config(function(FacebookProvider) {
    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
    FacebookProvider.init('1478625579067596');
  })

  .config(function($httpProvider, AuthProvider) {
    AuthProvider.registerPath('/api/v1/users.json');
    AuthProvider.loginPath('/api/v1/users/sign_in.json');
    //        AuthProvider.logoutPath('/api/users/sign_out.json');
    //authInterceptor to handle 401 errors and intercept the requests/responses
    $httpProvider.interceptors.push('authInterceptor');
    //401Interceptor to handle 401 errors
  })


  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('landing_page', {
        abstract: true,
        url: '/',
        templateUrl: 'views/landing_page.html',
        controller: 'LandingPageCtrl'
      })

      .state('landing_page.initial_page', {
        url: '',
        templateUrl: 'views/landing_page_initial.html',
        controller: 'LandingPageCtrl'
      })

      //.state('landing_page.volunteer_landing', {
      //    url: 'volunteers',
      //    templateUrl: 'views/landing_page_volunteers.html',
      //    controller: 'LandingPageVolunteerCtrl'
      //})

      .state('volunteer_home', { //default page loaded for landing state
        url: '/volunteer_home',
        templateUrl: 'views/volunteer_home.html', // url for partial
        //resolve:{
        //  userLocation: function(geolocation) {
        //    return geolocation.getLocation().then(function(data){
        //      var origin = new google.maps.LatLng(data.coords.latitude, data.coords.longitude)
        //      return origin;
        //    })
        //  }
        //},
        controller: 'VolunteerHomeCtrl'
      })

      .state('landing_page.organization_landing', {
        url: 'organizations',
        templateUrl: 'views/landing_page_organizations.html',
        controller: 'LandingPageOrganizationsCtrl'
      })

      .state('organization_home', { //default page loaded for landing state
        url: '/organization_home/:organization_Id',
        templateUrl: 'views/organization_home.html', // url for partial
        controller: 'OrganizationHomeCtrl'
      })

      .state('profile', {
        url: '/profile/:profile_Id',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })







  });
