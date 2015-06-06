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
    $scope.photo_consent = true;

    $scope.hours = 1;

    $scope.timeDuration = function () {
      var attr = {};
      attr.hours = $scope.hours;
      attr.date_recorded = new Date().toString();
      if ($scope.opportunity_role !== undefined) {
      attr.opportunity_role_id = $scope.opportunity_role.id;
      }
      attr.person_id = person.id;
      attr.opportunity_id = $stateParams.opportunity_Id;
      attr.organization_id = opportunity.organization_id;
      attr.photo_consent = $scope.photo_consent;
      attr.sign_in  = true;
      console.log(attr)
      RecordedHours.create(attr);
      $scope.confirmed = true;
      $timeout(function() {
        $modalInstance.dismiss('cancel');
      }, 1000)
    };

    Idle.watch();


    $scope.$on('IdleTimeout', function() {
      $scope.timeDuration();
    });




  });

