/**
 * Created by chrismccarthy on 3/12/15.
 */

angular.module('voluntrApp')
  .controller('SideMenuCtrl', function ($scope, $stateParams, $state, Opportunity,
                                        $modal, $rootScope) {

    $scope.organization_id = $stateParams.organization_Id;
    console.log($stateParams)


  });
