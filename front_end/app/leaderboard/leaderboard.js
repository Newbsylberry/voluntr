angular.module('voluntrApp')

.controller('LeaderboardCtrl',['$scope','Leaderboard',
  function($scope, Leaderboard) {
    $scope.data = {};

    Leaderboard.get().then(function(response){
      $scope.data.lb = response.data;
    });

  }
]);
