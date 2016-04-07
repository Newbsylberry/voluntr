angular.module('voluntrApp')
.directive("compareTo",
function () {
  return {
    require: 'ngModel',
    scope: {
      comparedValue: "=compareTo"
    },
    link: function(scope, element, attrs, ngModel) {
      ngModel.$validators.compareTo = function(value) {
        return value === scope.comparedValue;
      };

      scope.$watch("comparedValue", function() {
        ngModel.$validate();
      });
    }
  };
}
);
