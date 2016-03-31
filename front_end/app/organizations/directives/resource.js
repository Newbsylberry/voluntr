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
    controller: function ($scope,$mdDialog,Resource) {

      $scope.deleteResource = function(resource){
        var index = $scope.resourcesList.indexOf(resource);
        if (index > -1) {
          $scope.resourcesList.splice(index, 1);
        }
        Resource.delete(resource.id)
      };

      $scope.resource_types = ['For Volunteers','Internal Use'];

      $scope.updateResource = function(resource){
        var attr = {};
        attr.id = resource.id;
        attr.name = resource.name;
        attr.description = resource.description;
        attr.type_name = resource.type_name;
        Resource.update(attr);
      }

    }
  }
});
