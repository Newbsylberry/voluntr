'use strict';

/**
 * @ngdoc service
 * @name chronicleMeApp.authInterceptor
 * @description
 * # authInterceptor
 * Service in the chronicleMeApp.
 */



angular.module('voluntrApp')
  .service('authInterceptor', function authInterceptor($rootScope, $q, $location,$injector) {
        
	  return {
            'request': function (config) {
                config.headers = config.headers || {}; // creates header
                if (localStorage.token) { // check to see if a token exists on clients computer
                    config.headers.Authorization = 'Bearer ' + localStorage.token; // Adds authorization:token to header from local storage 
                }
                else if(sessionStorage.token){
                	 config.headers.Authorization = 'Bearer ' + sessionStorage.token; // Adds authorization:token to header from session storage which will be cleared on session close
                }
                return config;	 // Returns header with token
            },
            'response': function (response) {
                return response || $q.when(response);
            }
            //401 Unauthorized error handler 
//            'responseError': function(rejection) {
//
//            	var modalInstance = null;
//
//            	//if a 401 unauthorized error occurs then the user is prompted to login
//            	if(rejection.status == 401)
//            		{
//            			var rejectionMessage = [rejection];
//            			if(modalInstance == null)
//            			{
//            				modalInstance = $injector.get('$modal').open({
//                	    controller: 'reLoginCtrl',
//                	    templateUrl: 'views/partials/reLogin.modal.html',
//                	    resolve: {
//                	         currentState: function () {
//                	           return $injector.get('$state').current;
//                	         }
//                	       }
//                	});
//            	}
//            }
//            return rejectionMessage;
//            }
        };
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
