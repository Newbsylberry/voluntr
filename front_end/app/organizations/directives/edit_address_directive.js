angular.module('voluntrApp').directive("editAddress", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/edit_address.html',
    scope: {
      address1: '@',
      address2: '@',
      zipCode: '@',
      state: '@',
      city: '@',
      modelId: '@',
      addressType: '@'
    },
    restrict: 'E',
    controller: function ($scope, Opportunity, People, Organization) {

      $scope.editing = false;

      $scope.editAddress = function() {
        $scope.editing = true;
      };

      $scope.saveAddress = function() {
        var attr = {};
        attr.id = $scope.modelId;
        attr.address_1 = $scope.address1;
        attr.address_2 = $scope.address2;
        attr.city = $scope.city;
        attr.zip_code = $scope.zipCode;
        attr.state = $scope.state;
        if ($scope.addressType === "opportunity") {
          Opportunity.update(attr);
        } else if ($scope.addressType == "person") {
          People.update(attr);
        } else if ($scope.addressType == "organization") {
          Organization.update(attr)
        }
        $scope.editing = false;
      };






    }
  }
});
