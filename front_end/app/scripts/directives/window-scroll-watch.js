angular.module('voluntrApp').directive("scroll", function ($window) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {
      console.log("SCROLLL")
      scope.sticky = true;
      scope.$apply();
    });
  };
});
