// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-10-13 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/js-xlsx/dist/xlsx.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular-facebook/lib/angular-facebook.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js',
      'bower_components/angular-scroll-watch/src/angular-scroll-watch.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-scroll/angular-scroll.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/ngmap/build/scripts/ng-map.js',
      'bower_components/angular-devise/lib/devise.js',
      'bower_components/angularjs-geolocation/src/geolocation.js',
      'bower_components/highcharts-ng/dist/highcharts-ng.js',
      'bower_components/ng-mfb/src/mfb-directive.js',
      'bower_components/md-date-time/dist/md-date-time.js',
      'bower_components/angular-duration-format/dist/angular-duration-format.js',
      'bower_components/angular-duration-format/dist/angular-duration-format.js',
      'bower_components/angular-ui-calendar/src/calendar.js',
      'bower_components/angular-snap/angular-snap.js',
      'bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
      'bower_components/kendo-ui-core/js/kendo.ui.core.min.js',
      'bower_components/ngHandsontable/dist/ngHandsontable.js',
      // endbower
      'app/scripts/**/*.js',
      'app/organizations/**/*.js',
      'app/static_pages/**/*.js',
      'app/volunteers/**/*.js',
      'app/navigation/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
      'app/scripts/jquery.scrollto.js'
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
