/**
 * Created by chrismccarthy on 4/6/15.
 */
/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('OpportunitySignInConfirmationCtrl', function ($scope, $modal, $modalInstance,
                                                             $stateParams, person, opportunity,
                                                             RecordedHours) {


    $scope.opportunity = opportunity;


    $scope.timeDuration = function () {
      var attr = {};
      attr.hours = $scope.hours;
      attr.person_id = person.id;
      attr.opportunity_id = $stateParams.opportunity_Id;
      attr.organization_id = opportunity.organization_id;
      RecordedHours.create(attr);
      $modalInstance.dismiss('cancel');
    };



  });

