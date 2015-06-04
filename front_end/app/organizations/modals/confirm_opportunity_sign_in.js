/**
 * Created by chrismccarthy on 4/6/15.
 */
/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('OpportunitySignInConfirmationCtrl', function ($scope, $modal, $modalInstance,
                                                             $stateParams, person, opportunity,
                                                             RecordedHours, $timeout, Idle, Keepalive) {


    $scope.opportunity = opportunity;


    $scope.timeDuration = function () {
      var attr = {};
      attr.hours = $scope.hours;
      attr.person_id = person.id;
      attr.opportunity_id = $stateParams.opportunity_Id;
      attr.organization_id = opportunity.organization_id;
      RecordedHours.create(attr);
      $scope.confirmed = true;
      $timeout(function() {
        $modalInstance.dismiss('cancel');
      }, 1000)
    };

    Idle.watch();


    $scope.$on('IdleTimeout', function() {
      $scope.hours = 1;
      $scope.timeDuration();
    });




  });

