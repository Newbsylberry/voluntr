angular.module('voluntrApp').directive("voluForm", function () {
  return {
    transclude: true,
    template: '<form class="form-container">' +
    '<h2 class="form-title">{{title}}</h2>' +
     '<p class="form-description">{{description}}</p>' +
    '<div class="form-alert">{{alert}}</div>' +
    '<div ng-transclude></div></form>',
    restrict: 'E',
    scope: {
      alert: '=',
      title: '@',
      description: '@'
    }
  }
});
