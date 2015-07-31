angular.module('voluntrApp').directive("scroll", function ($window) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {
      console.log("Keep scrolling scrolling scrolling")
      scope.sticky = true;
      scope.$apply();
    });
  };
});
