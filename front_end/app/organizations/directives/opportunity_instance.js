angular.module('voluntrApp').directive("opportunityInstance", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/opportunity_instance.html',
    scope: {
      instancesList: "=",
      opportunity: "=",
      currentInstance: '='
    },
    restrict: 'E',
    controller: function ($scope, $mdDialog,$modal,$http) {

      $scope.switchDates = function (date){
        $scope.currentInstance = date;
      }

      //$scope.getInstanceVolunteers = function(instance, instance_date){
      //  $http.get('/api/v1/opportunity_instances/' + $scope.opportunity.id + '/' + new Date($scope.opportunity.instance_date) + '/instance_roles')
      //    .then(function(data){
      //      console.log("roles")
      //      $scope.opportunity.instance.instance_roles = data.data;
      //    })
      //}
    }
  }
});
