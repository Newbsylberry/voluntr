angular.module('voluntrApp').directive("editAddress", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/edit_address.html',
    scope: {
      address: '@',
      zipCode: '@',
      state: '@',
      city: '@',
      modelId: '@',
      addressType: '@'
    },
    restrict: 'E',
    controller: function ($scope, Opportunity) {

      $scope.editing=false;

      $scope.editAddress = function() {
        $scope.editing = true;
      };

      $scope.saveAddress = function() {
        $scope.editing = false;
        var attr = {};
        attr.id = $scope.modelId;
        attr.address = $scope.address;
        attr.city = $scope.city;
        attr.zip_code = $scope.zipCode;
        attr.state = $scope.state;
        if ($scope.addressType === "opportunity") {
          Opportunity.update(attr);
        }
      };






    }
  }
});
