angular.module('voluntrApp').directive("editMailingServiceList", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/mailing_service_list.html',
    scope: {
      cabbage: '='
    },
    restrict: 'E',
    controller: function ($scope, OrganizationMailingService) {

      $scope.organization_mailing_service = $scope.cabbage;

      $scope.editing = false;

      $scope.update = function(list) {
        $scope.editing = false;
        var attr = {};
        attr.id = list.organization_mailing_service_id;
        attr.default_list_id = list.id;
        OrganizationMailingService.update(attr)
      }

    }
  }
});
