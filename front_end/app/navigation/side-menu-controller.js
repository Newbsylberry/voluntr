/**
 * Created by chrismccarthy on 3/12/15.
 */

angular.module('voluntrApp')
  .controller('SideMenuCtrl', function ($scope, $stateParams, $state, Opportunity,
                                        $modal, $rootScope) {

    $scope.toggleLeft = buildToggler('left');

    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };

    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      },300);
      return debounceFn;
    }






  });
