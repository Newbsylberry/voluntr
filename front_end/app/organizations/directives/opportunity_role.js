angular.module('voluntrApp').directive("opportunityRole", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/opportunity_role.html',
    scope: {
      rolesList: "=",
      opportunity: "="
    },
    restrict: 'E',
    controller: function ($scope, OpportunityRole, $mdDialog,$modal) {

      console.log($scope.opportunity)
      console.log("Hello World")

      $scope.updateOpportunityRole = function(opportunity_role) {
        var attr = {};
        attr.id = opportunity_role.id;
        attr.name = opportunity_role.name;
        attr.description = opportunity_role.description;
        attr.volunteers_required = opportunity_role.volunteers_required;
        attr.hours_required = opportunity_role.hours_required;
        var opportunity_role = OpportunityRole.update(attr)
        $scope.editing = false;
      };

      $scope.deleteOpportunityRole = function(opportunity_role) {
        var index = $scope.opportunity.opportunity_roles.indexOf(opportunity_role);
        if (index > -1) {
          $scope.opportunity.opportunity_roles.splice(index, 1);
        }
        OpportunityRole.delete(opportunity_role.id)
        $scope.opportunity_role.name = "";
        $scope.opportunity_role.description = "";
      };



      $scope.viewVolunteers = function(opportunity_role){
        var opportunityRoleModal = $modal.open(
          {
            templateUrl: 'organizations/modals/opportunity_role.html',
            controller: 'OpportunityRoleCtrl',
            windowClass: 'opportunity-role-modal',
            size: 'sm',
            resolve: {
              opportunity_role: function () {
                return opportunity_role
              }
            }
          });

        opportunityRoleModal.result.then(function () {

          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          });
      }
    }
  }
});
