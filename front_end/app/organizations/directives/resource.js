angular.module('voluntrApp').directive("resource", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/resource.html',
    scope: {
      resourcesList: "=",
      object: "=",
      type: "@"
    },
    restrict: 'E',
    controller: function ($scope,$mdDialog) {

    }
  }
});
