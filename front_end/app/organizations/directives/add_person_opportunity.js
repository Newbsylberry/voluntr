angular.module('voluntrApp').directive("addPersonOpportunity", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/add_person_opportunity.html',
    scope: {
      type: "@",
      selectedObject: "=",
      opportunity: '=',
      instance: '='
    },
    restrict: 'E',
    controller: function ($scope,$mdDialog,PersonOpportunity) {

      $scope.openForm = function(opportunity_instances){
        $mdOpenMenu(opportunity_instances)
      };

      $scope.person = {};
      $scope.person_opportunity = {};

      $scope.addPersonOpportunity = function(){
        var attr = {};
        attr.instances = [];
        if ($scope.type !== 'instance'){
        attr.instances.push(new Date($scope.opportunity.instance_date));
        } else if ($scope.type === 'instance'){
          attr.instances.push(new Date($scope.selectedObject.instance_date));
        }
        if ($scope.type === 'role') {
          attr.opportunity_role_id = $scope.selectedObject.id;
        } else if ($scope.type !== 'role') {
          attr.opportunity_role_id = $scope.person_opportunity.opportunity_role;
        }
        attr.first_name = $scope.person.first_name;
        attr.last_name = $scope.person.last_name;
        attr.opportunity_id = $scope.opportunity.id;
        if ($scope.person.email){
          attr.email = $scope.person.email;
        } else if ($scope.person.phone){
          attr.phone = $scope.person.phone;
        }
        PersonOpportunity.create(attr)
        $scope.person = {};
        $scope.person_opportunity = {};
      }
    }
  }
});
