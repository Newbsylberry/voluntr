angular.module('voluntrApp')

.controller('LeaderboardCtrl',['$scope','Leaderboard',
  function($scope, Leaderboard) {
    $scope.data = {};
    $scope.data.count = 3;

    $scope.teamMostActive = {
      more: false,
      count: 3
    };

    $scope.nonprofitHours = {
      more: false,
      count: 3
    };

    $scope.individualHours = {
      more: false,
      count: 3
    };

    $scope.teamAdditional = {
      hoursPerPerson: {
        more: false,
        count: 0
      },
      participationRate: {
        more: false,
        count: 0
      },
      totalHours: {
        more: false,
        count: 0
      },
      totalEvents: {
        more: false,
        count: 0
      }
    };

    $scope.showMore = function(list) {
      if (!list.more) {
        list.count = 10;
      } else {
        list.count = 3;
      }

      list.more = !list.more;
    }

    $scope.additionalShowMore = function(list) {
      if (!list.more) {
        list.count = 7;
      } else {
        list.count = 0;
      }

      list.more = !list.more;
    }

    Leaderboard.get().then(function(response){
      $scope.data.lb = response.data;
    });


  }
]);
