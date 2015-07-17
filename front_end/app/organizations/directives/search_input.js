angular.module('voluntrApp').directive('searchInput', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      console.log("Hello")
      scope.$apply(function (){
        scope.$eval(attrs.ngEnter);
      });
      event.preventDefault();
    });
  };
});
