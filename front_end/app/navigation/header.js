angular.module('voluntrApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, searchService,$window) {


    $scope.search_filter = searchService.search;

    $('.centered-container').scroll(function() {
      var distanceY =  document.querySelector(".centered-container").scrollTop
      var shrinkOn = 300;
      var header = document.querySelector(".application-header");
      if (distanceY > shrinkOn) {
        classie.add(header,"smaller");
      } else {
        if (classie.has(header,"smaller")) {
          classie.remove(header,"smaller");
        }
      };
    });

  });
