/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, searchService,$window) {

    $scope.search_filter = searchService.search;


    $(window).scroll(function() {
        console.log("hello world");
var distanceY = $window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 300,
            header = document.querySelector(".application-header");
        if (distanceY > shrinkOn) {
            classie.add(header,"smaller");
        } else {
            if (classie.has(header,"smaller")) {
                classie.remove(header,"smaller");
            }
        }

});
    

  });
