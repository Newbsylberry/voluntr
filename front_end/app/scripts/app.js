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
    'ui.router'
  ])
    .config(function(FacebookProvider) {
        // Set your appId through the setAppId method or
        // use the shortcut in the initialize method directly.
        FacebookProvider.init('1478625579067596');
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





  });
