angular.module('voluntrApp').directive("voluFormGroup", function () {
  return {
    transclude: true,
    template: '<div class="form-group">' +
    '<p class="form-group-description">{{direction}}</p>' +
    '<div ng-transclude></div></div>',
    restrict: 'E',
    scope: {
      direction: '@'
    }
  }
});
