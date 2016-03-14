angular.module('voluntrApp')

.factory('Leaderboard',['$http',
  function($http) {
      return {
        get: function() {
          return $http.get('./leaderboard/sample.json');
        }
      };
  }
]);
