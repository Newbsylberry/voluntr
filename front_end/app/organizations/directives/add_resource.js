angular.module('voluntrApp').directive("addResource", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/add_resource.html',
    scope: {
      object: "=",
      resourcesList: "=",
      type: "@"
    },
    restrict: 'E',
    controller: function ($scope,Upload) {

      $scope.resources = [];

      $scope.$watch('files', function () {
        if ($scope.files && $scope.files.length > 0) {
          angular.forEach($scope.files, function (file) {
            var resource = {};
            resource.name = file.name;
            resource.file = file;
            $scope.resources.push(resource);
          });
          $scope.files = [];
        }
      });

      $scope.deleteResource = function (resource) {
        var index = $scope.resources.indexOf(resource);
        if (index > -1) {
          $scope.resources.splice(index, 1);
        }
      };

      if ($scope.type === 'opportunity') {
        var type = 'Opportunity'
      } else if ($scope.type === 'person') {
        var type = 'Person'
      } else if ($scope.type === 'organization') {
        var type = 'Organization'
      }
      $scope.resource_types = ['For Volunteers','Internal Use'];

      $scope.uploadFiles = function() {
        if ($scope.resources.length > 0) {
          angular.forEach($scope.resources, function (resource) {
            Upload.upload({
              url: '/api/v1/resources',
              method: 'POST',
              fields: {
                "resource[name]": resource.name,
                "resource[description]": resource.description,
                "resource[resourceable_type]": type,
                "resource[resourceable_id]": $scope.object.id,
                "resource_type": resource.resource_type
              },
              file: {'resource[resource]': resource.file}
            }).then(function (resp) {
              console.log(resp)
              $scope.resourcesList.push(resource);
              $scope.add_resource = false;
            });
          })
        }
      }
    }
  };
});


