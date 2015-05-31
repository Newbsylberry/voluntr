angular.module('voluntrApp').directive("addResources", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/add_resources.html',
    scope: {
      resourceId: "@"
    },
    restrict: 'E',
    controller: function ($scope, Opportunity, $modal) {

      $scope.openAddResourceModal = function(size) {
        var addResourceModal = $modal.open(
          {
            templateUrl: 'organizations/modals/add_resource.html',
            controller: 'AddResourceCtrl',
            windowClass: 'add-event-modal-window',
            size: size
          });

        addResourceModal.result.then(function () {

          },
          function () {

            console.log('Modal dismissed at: ' + new Date());
          });


      };


    }
  }
});
