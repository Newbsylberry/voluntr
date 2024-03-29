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
    'daterangepicker',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'facebook',
    'ui.bootstrap',
    'pc035860.scrollWatch',
    'ui.router',
    'ngMaterial',
    'ngFileUpload',
    'pdf',
    'ngMap',
    'Devise',
    'geolocation',
    'highcharts-ng',
    'ng-mfb',
    'mdDateTime',
    'config',
    'angular-duration-format',
    'ui.calendar',
    'snap',
    'leaflet-directive',
    'kendo.directives',
    'ngHandsontable',
    'angulartics',
    'angulartics.google.analytics',
    'ngIdle',
    'ngCsv',
    'md.data.table',
    'ngStorage',
    'angular-flexslider'
  ])

  .config(function(IdleProvider, KeepaliveProvider) {
    IdleProvider.idle(4);
    IdleProvider.timeout(6);
    KeepaliveProvider.interval(10);
  })


  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue', {
        'default': 'A400', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })
      // If you specify less than all of the keys, it will inherit from the
      // default shades
      .accentPalette('pink', {
        'default': '300' // use shade 200 for default, and keep all other shades the same
      });
  })




  .config(function(FacebookProvider, ENV) {
    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
    FacebookProvider.init(ENV.appId);
  })

  .config(function($httpProvider, AuthProvider) {
    AuthProvider.registerPath('/api/v1/users.json');
    AuthProvider.loginPath('/api/v1/users/sign_in.json');
    // AuthProvider.loginMethod('GET');
    // AuthProvider.resourceName('sign_in');
    //        AuthProvider.logoutPath('/api/users/sign_out.json');
    //authInterceptor to handle 401 errors and intercept the requests/responses
    $httpProvider.interceptors.push('authInterceptor');
    //401Interceptor to handle 401 errors
  })

  .run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
      // to be used for back button //won't work when page is reloaded.
      $rootScope.previousState_name = fromState.name;
      $rootScope.previousState_params = fromParams;
    });
    //back button function called from back button's ng-click="back()"
    $rootScope.back = function() {
      $state.go($rootScope.previousState_name,$rootScope.previousState_params);
    };
  })


  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      //.state('landing_page', {
      //  abstract: true,
      //  url: '/',
      //  templateUrl: 'views/landing_page.html',
      //  controller: 'LandingPageCtrl'
      //})

      .state('landing_page', {
        url: '/',
        templateUrl: 'static_pages/landing_page.html',
        controller: 'LandingPageCtrl'
      })

      .state('volunteer_drive_16', {
        url: '/volunteer_drive',
        templateUrl: 'static_pages/volunteer_drive_16/home.html',
        abstract: true,
        controller: 'VolunteerDrive16Ctrl'
      })

      .state('volunteer_drive_16.menu', {
        url: '',
        templateUrl: 'static_pages/volunteer_drive_16/menu.html',
        controller: 'VolunteerDrive16Ctrl'
      })

      .state('volunteer_drive_16.volunteers', {
        url: '',
        templateUrl: 'static_pages/volunteer_drive_16/volunteers.html',
        controller: 'VolunteerDrive16Ctrl'
      })

      .state('volunteer_drive_16.sponsors', {
        url: '/sponsors',
        templateUrl: 'static_pages/volunteer_drive_16/sponsors.html',
        controller: 'VolunteerDrive16Ctrl'
      })

      .state('volunteer_drive_16.non_profits', {
        url: '',
        abstract: true,
        templateUrl: 'static_pages/volunteer_drive_16/non_profits.html'
      })

      .state('volunteer_drive_16.non_profits.1', {
        url: '',
        templateUrl: 'static_pages/volunteer_drive_16/non_profits_1.html'
      })

      .state('volunteer_drive_16.non_profits.2', {
        url: '',
        templateUrl: 'static_pages/volunteer_drive_16/non_profits_2.html'
      })

      .state('volunteer_drive_16.non_profits.3', {
        url: '',
        templateUrl: 'static_pages/volunteer_drive_16/non_profits_3.html'
      })

      .state('volunteer_drive_16.non_profits.4', {
        url: '',
        templateUrl: 'static_pages/volunteer_drive_16/non_profits_4.html'
      })

      .state('volunteer_drive_16.non_profits.form', {
        url: '/form',
        templateUrl: 'static_pages/volunteer_drive_16/non_profits_form.html'
      })

      .state('volunteer_home', { //default page loaded for landing state
        url: '/volunteer_home',
        templateUrl: 'volunteers/volunteer_home.html', // url for partial
        controller: 'VolunteerHomeCtrl'
      })

      .state('volunteers', { //default page loaded for landing state
        url: '/volunteers',
        abstract: true,
        templateUrl: 'volunteers/volunteers.html', // url for partial
        controller: 'VolunteerMainCtrl'
      })

      .state('volunteers.export_report', { //default page loaded for landing state
        url: '/export_report',
        templateUrl: 'volunteers/volunteer_export.html', // url for partial
        controller: 'ExportVolunteerReportCtrl'
      })

      .state('organizations', {
        url: '/organizations',
        abstract: true,
        templateUrl: 'organizations/organization.html',
        controller: 'OrganizationMainCtrl'
      })

      .state('users', {
        url: '/users',
        absolute: true,
        templateUrl: 'users/users.html',
        controller: 'UsersCtrl'
      })

      .state('users.confirm_registration', {
        url: '/confirm_registration/:token',
        templateUrl: 'users/confirm_registration/confirm_registration.html',
        controller: 'ConfirmUserRegistrationCtrl'
      })


      //.state('organizations_public', {
      //  url: ':custom_url' + '.' + '/',
      //  templateUrl: 'organizations/public/organization_public.html',
      //  controller: 'OrganizationPublicCtrl'
      //})
      //

      .state('organizations.registration', {
        url: '/registration',
        templateUrl: 'organizations/registration/organization_registration.html',
        controller: 'OrganizationRegistrationCtrl'
      })

      .state('organizations.email_registration', {
        url: '/email_registration',
        abstract: true,
        templateUrl: 'organizations/registration/organization_registration_email.html',
        controller: 'OrganizationRegistrationCtrl'
      })

      .state('organizations.email_registration.1', {
        url: '',
        templateUrl: 'organizations/registration/organization_registration_email_1.html',
      })

      .state('organizations.email_registration.2', {
        url: '',
        templateUrl: 'organizations/registration/organization_registration_email_2.html',
      })

      .state('organizations.email_registration.3', {
        url: '',
        templateUrl: 'organizations/registration/organization_registration_email_3.html',
      })

      .state('organizations.user_organizations', {
        url: '/user_organizations',
        templateUrl: 'organizations/user_organizations/user_organizations.html',
        controller: 'UserOrganizationsCtrl'
      })

      .state('organizations.tutorial', {
        url: '/:organization_Id/tutorial',
        templateUrl: 'organizations/tutorial/tutorial.html',
        controller: 'OrganizationTutorialCtrl'
      })



      .state('organizations.tutorial.1', {
        url: '/1',
        templateUrl: 'organizations/tutorial/tutorial_screen_1.html'
      })

      .state('organizations.tutorial.2', {
        url: '/2',
        templateUrl: 'organizations/tutorial/tutorial_screen_2.html'
      })

      .state('organizations.tutorial.3', {
        url: '/3',
        templateUrl: 'organizations/tutorial/tutorial_screen_3.html'
      })

      .state('organizations.tutorial.4', {
        url: '/4',
        templateUrl: 'organizations/tutorial/tutorial_screen_4.html'
      })

      .state('organizations.tutorial.5', {
        url: '/5',
        templateUrl: 'organizations/tutorial/tutorial_screen_5.html'
      })

      .state('organizations.tutorial.6', {
        url: '/6',
        templateUrl: 'organizations/tutorial/tutorial_screen_6.html'
      })

      .state('organizations.organization_home', { //default page loaded for landing state
        url: '/:organization_Id',
        templateUrl: 'organizations/home/organization_home.html', // url for partial
        controller: 'OrganizationHomeCtrl'
      })

      .state('organizations.organization_account', { //default page loaded for landing state
        url: '/:organization_Id/account',
        templateUrl: 'organizations/account/organization_account.html', // url for partial
        controller: 'OrganizationAccountCtrl'
      })

      .state('organizations.people_home', { //default page loaded for landing state
        url: '/:organization_Id/people_home',
        templateUrl: 'organizations/people/people_home.html', // url for partial
        controller: 'PeopleHomeCtrl'
      })

      .state('organizations.bulk_import_people', { //default page loaded for landing state
        url: '/:organization_Id/bulk_import',
        templateUrl: 'organizations/people/bulk_import_people.html', // url for partial
        controller: 'BulkImportPeopleCtrl'
      })

      .state('organizations.nearby_organizations', { //default page loaded for landing state
        url: '/:organization_Id/nearby_organizations',
        templateUrl: 'organizations/nearby_organizations/nearby_organizations.html', // url for partial
        controller: 'NearbyOrganizationsCtrl'
      })

      .state('organizations.opportunities_home', { //default page loaded for landing state
        url: '/:organization_Id/opportunity_home',
        templateUrl: 'organizations/opportunities/opportunities_home.html', // url for partial
        controller: 'OpportunitiesHomeCtrl'
      })

      .state('organization_volunteer_registration', { //default page loaded for landing state
        abstract: true,
        url: '/:organization_custom_Url/registration',
        templateUrl: 'organizations/volunteer_registration/volunteer_registration.html', // url for partial
        controller: 'OrganizationVolunteerRegistrationCtrl'
      })

      .state('organization_volunteer_registration.1', { //default page loaded for landing state
        url: '?token',
        templateUrl: 'organizations/volunteer_registration/volunteer_registration_1.html', // url for partial
      })

      .state('organization_volunteer_registration.2', { //default page loaded for landing state
        url: '/2?token',
        templateUrl: 'organizations/volunteer_registration/volunteer_registration_2.html', // url for partial
      })

      .state('organization_volunteer_registration.3', { //default page loaded for landing state
        url: '/3?token',
        templateUrl: 'organizations/volunteer_registration/volunteer_registration_3.html', // url for partial
      })

      .state('organization_volunteer_registration.4', { //default page loaded for landing state
        url: '/4?token',
        templateUrl: 'organizations/volunteer_registration/volunteer_registration_4.html', // url for partial
      })

      .state('organization_volunteer_registration.5', { //default page loaded for landing state
        url: '/5?token',
        templateUrl: 'organizations/volunteer_registration/volunteer_registration_5.html', // url for partial
      })


      .state('registration_form', { //default page loaded for landing state
        url: '/:opportunity_Id/opportunity_registration',
        templateUrl: 'organizations/opportunities/registration_form.html', // url for partial
        controller: 'OpportunityRegistrationCtrl'
      })

      .state('sign_in_form', { //default page loaded for landing state
        url: '/:opportunity_Id/sign_in/:instance_date',
        abstract: true,
        templateUrl: 'organizations/opportunities/sign_in_form.html', // url for partial
        controller: 'OpportunitySignInCtrl'
      })

      .state('sign_in_form.initial_information', { //default page loaded for landing state
        url: '',
        templateUrl: 'organizations/opportunities/sign_in_form_initial_information.html' // url for partial
      })

      .state('sign_in_form.confirmation_information', { //default page loaded for landing state
        url: '',
        templateUrl: 'organizations/opportunities/sign_in_form_confirmation_information.html' // url for partia
      })

      .state('profile', {
        url: '/profile/:profile_Id',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })

      .state('unauthenticated_forms', {
        url: '/forms',
        abstract: true,
        templateUrl: 'views/unauthenticated_forms.html'
      })
      .state('leaderboard', {
        url: '/leaderboard',
        templateUrl: 'leaderboard/leaderboard.html',
        controller: 'LeaderboardCtrl'
      })

      .state('unauthenticated_forms.reset_password', {
        url: '/request-password-reset',
        templateUrl: 'views/reset_password.html',
        controller: 'ResetPasswordCtrl'
      })
      .state('team', {
        url: '/leaderboard/team',
        templateUrl: 'leaderboard/team.html',
        controller: 'LeaderboardCtrl'
      })

      .state('unauthenticated_forms.user_reset_password', {
        url: '/reset_password/:resetToken',
        templateUrl: 'views/reset_password_2.html',
        controller: 'UserResetPasswordCtrl'
      })




  });
