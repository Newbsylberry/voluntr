angular.module('voluntrApp').directive("voluFormSection", function () {
  return {
    transclude: true,
    template: '<div layout="row" class="form-section">' +
    '<div flex="100">' +
      '<h3 class="form-section-title">{{title}}</h3>' +
      '<p class="form-section-text">{{description}}</p>' +
    '<div ng-transclude></div></div>',
    restrict: 'E',
    scope: {
      title: '@',
      description: '@'
    }
  }
});

