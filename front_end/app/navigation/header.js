angular.module('voluntrApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, searchService,$window) {

    $scope.search_filter = searchService.search;




    // $(window).scroll(function(e) {
      // console.log("Keeep scrolling scrolling scrolling what")
      //var distanceY = $window.pageYOffset || document.documentElement.scrollTop,
      //  shrinkOn = 300,
      //  header = document.querySelector("header");
      //if (distanceY > shrinkOn) {
      //  classie.add(header,"smaller");
      //} else {
      //  if (classie.has(header,"smaller")) {
      //    classie.remove(header,"smaller");
      //  }
      //}

    // });


  });
