/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, searchService) {

    $scope.search_filter = searchService.search;



  });
