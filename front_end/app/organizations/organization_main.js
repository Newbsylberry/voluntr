angular.module('voluntrApp')
  .controller('OrganizationMainCtrl', function ($scope, Facebook, $stateParams,
                                                 $http, $state, $filter,
                                                 uiCalendarConfig, $rootScope) {

    $scope.$on("$stateChangeSuccess", function updatePage() {
      $scope.current_state = $state.current.name;
      console.log($scope.current_state)
      $rootScope.organization_id = $state.params.organization_Id
      // $scope.current_state = $state.params.slug;
    });


  });

