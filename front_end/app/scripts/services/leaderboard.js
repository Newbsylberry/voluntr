angular.module('voluntrApp')

.factory('Leaderboard',['$http',
  function($http) {
      return {
        get: function() {
          return $http.get('api/v1/administration/volunteer_drive_leaderboard');
        }
      };
  }
]);
