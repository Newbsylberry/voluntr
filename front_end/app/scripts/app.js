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
    'ng-mfb',
    'mdDateTime',
    // 'angular-duration-format',
    'ui.calendar',
    'snap',
    'leaflet-directive',
    "kendo.directives"
  ])




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
        templateUrl: 'static_pages/landing_page_initial.html',
        controller: 'LandingPageCtrl'
      })

      .state('volunteer_home', { //default page loaded for landing state
        url: '/volunteer_home',
        templateUrl: 'volunteers/volunteer_home.html', // url for partial
        controller: 'VolunteerHomeCtrl'
      })

      .state('organizations', {
        url: '/organizations',
        abstract: true,
        templateUrl: 'organizations/organization.html',
        controller: 'OrganizationMainCtrl'
      })

      .state('organizations.registration', {
        url: '/registration',
        templateUrl: 'organizations/registration/organization_registration.html',
        controller: 'OrganizationRegistrationCtrl'
      })

      .state('organizations.organization_home', { //default page loaded for landing state
        url: '/:organization_Id',
        templateUrl: 'organizations/home/organization_home.html', // url for partial
        controller: 'OrganizationHomeCtrl'
      })

      .state('organizations.people_home', { //default page loaded for landing state
        url: '/:organization_Id/people_home',
        templateUrl: 'organizations/people/people_home.html', // url for partial
        controller: 'PeopleHomeCtrl'
      })

      .state('organizations.opportunities_home', { //default page loaded for landing state
        url: '/:organization_Id/opportunity_home',
        templateUrl: 'organizations/opportunities/opportunities_home.html', // url for partial
        controller: 'OpportunitiesHomeCtrl'
      })

      .state('profile', {
        url: '/profile/:profile_Id',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })







  });
