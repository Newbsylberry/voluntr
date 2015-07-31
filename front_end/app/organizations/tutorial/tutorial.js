/**
 * Created by chrismccarthy on 4/24/15.
 */

/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('OrganizationTutorialCtrl', function ($scope, $modal, $rootScope, $http, $stateParams,
                                                    searchService, $window, $state) {

    console.log($scope.current_state)
    $scope.$watch('current_state', function(){
      if ($scope.current_state === 'organizations.tutorial.1') {
        $scope.link_text = "Importing People To Your Organization"
        $scope.link_state = "organizations.tutorial.2"
      } else if ($scope.current_state === 'organizations.tutorial.2') {
        $scope.back_link_text = "Back to Introduction"
        $scope.back_link_state = "organizations.tutorial.1"
        $scope.link_text = "Read About Adding Opportunities and Volunteers"
        $scope.link_state = "organizations.tutorial.3"
      } else if ($scope.current_state === 'organizations.tutorial.3') {
        $scope.back_link_text = "Back to Importing Your Data on Volu"
        $scope.back_link_state = "organizations.tutorial.2"
        $scope.link_text = "Read About Registering Your Volunteers"
        $scope.link_state = "organizations.tutorial.4"
      } else if ($scope.current_state === 'organizations.tutorial.4') {
        $scope.back_link_text = "Back to Quickly Adding Objects on Volu"
        $scope.back_link_state = "organizations.tutorial.3"
        $scope.link_text = "Read About Finding Things on Volu"
        $scope.link_state = "organizations.tutorial.5"
      } else if ($scope.current_state === 'organizations.tutorial.5') {
        $scope.back_link_text = "Back to Registering Volunteers on Volu"
        $scope.back_link_state = "organizations.tutorial.4"
        $scope.link_text = "Read About How Volu Integrates With Your Current Services"
        $scope.link_state = "organizations.tutorial.6"
      } else if ($scope.current_state === 'organizations.tutorial.6') {
        $scope.back_link_text = "Back to Integrating Services With Volu"
        $scope.back_link_state = "organizations.tutorial.5"
        $scope.link_text = "Access Your Dashboard"
      }
    });



    $scope.backFunction = function() {
      $state.go($scope.back_link_state)
    }
    $scope.forwardFunction = function() {
      if ($scope.current_state === 'organizations.tutorial.6') {
        $state.go('organizations.organization_home', {organization_Id:$stateParams.organization_Id})
        return
      };
      $state.go($scope.link_state)
    }
  });


