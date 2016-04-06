angular.module('voluntrApp')

.factory('Leaderboard',['$http',
  function($http) {
      return {
        get: function() {
          return $http.get('http://www.voluapp.com/api/v1/administration/volunteer_drive_leaderboard');
        }
      };
  }
]);
