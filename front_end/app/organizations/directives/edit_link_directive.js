angular.module('voluntrApp').directive("editObjectDirective", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/text-element.html',
    scope: {
      text: '@',
      size: '@',
      modelType: '@',
      attributeName: '@',
      modelId: '@',
      placeholder: '@'
    },
    restrict: 'E',
    controller: function ($scope, Opportunity, Organization) {


      if ($scope.size === "title_text") {
        $scope.title_text = true;

      } else if ($scope.size === "subtitle_text") {
        $scope.subtitle_text = true
      } else if ($scope.size === "paragraph_text") {
        $scope.paragraph_text = true
      }

      $scope.editText = function() {

        $scope.editing = true;
      }

      $scope.updateText = function() {
        $scope.editing = false;
        $scope.text = $scope.text;


        if ($scope.modelType === 'opportunity') {

          var attr = {};
          attr.id = $scope.modelId;
          attr[$scope.attributeName] = $scope.text;

          Opportunity.update(attr)
        }
        if ($scope.modelType === 'organization') {
          var attr = {};
          attr.id = $scope.modelId;
          attr[$scope.attributeName] = $scope.text;
          Organization.update(attr)
        }
      }
    },
  }
});
