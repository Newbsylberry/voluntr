angular.module('voluntrApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, searchService,$window) {


    $scope.search_filter = searchService.search;


  });
