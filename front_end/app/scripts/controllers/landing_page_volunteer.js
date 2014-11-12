'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageVolunteerCtrl
 * @description
 * # LandingPageVolunteerCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('LandingPageVolunteerCtrl', function ($scope, $state, Auth, $rootScope) {

        if (localStorage.user_id) {
            $state.go('volunteer_home')
        }

        $scope.newVolunteer = function () {
            var credentials = {};
            credentials.email = $scope.newVolunteer.email; // credentials.email equals $scope.newUser.email
            credentials.password = $scope.newVolunteer.password; // see above
            credentials.passwordConfirmation = $scope.newVolunteer.passwordConfirmation; // see above
            Auth.register(credentials).then(function(object){ //credentials are passed to Auth, which speaks with the devise gem in rails
                console.log(object)
                $rootScope.user = object.user;
                //when a new user is created assign data to both local and session storage
                localStorage.token = object.token;
                localStorage.user_id = object.user.id;
                $state.go('volunteer_home', {user_Id:object.user.id})
            })
        }

        $scope.logIn = function () {
            var attr = {};
            attr.email = $scope.logIn.email;
            attr.password = $scope.logIn.password;
            Auth.login(attr).then(function(object) {
                $rootScope.user = object.user;
                localStorage.user_id = object.user.id;
                localStorage.token = object.token
                $state.go('volunteer_home', {user_Id:object.user.id});
            })
        };

  });
