angular.module('voluntrApp').directive("editObjectDirective", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/text-element.html',
    scope: {
      text: '@',
      size: '@',
      kabloooey: '@',

      // This is the attribute name
      cabbage: '@',

      // This is the model id
      cabbagery: '@'
    },
    restrict: 'E',
    controller: function ($scope, Opportunity) {

      console.log($scope)
      if ($scope.size === "title_text") {
        $scope.title_text = true;

      } else if ($scope.size === "subtitle_text") {
        $scope.subtitle_text = true
      } else if ($scope.size === "paragraph_text") {
        $scope.paragraph_text = true
      }

      $scope.editText = function() {
        console.log($scope)
        $scope.editing = true;
      }

      $scope.updateText = function() {
        $scope.editing = false;
        $scope.text = $scope.text;


        if ($scope.kabloooey === 'opportunity') {

          var attr = {};
          attr.id = $scope.cabbagery;
          attr[$scope.cabbage] = $scope.text;
          console.log(attr)
          Opportunity.update(attr)
        }
      }
    },
  }
});
