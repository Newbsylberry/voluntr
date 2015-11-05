/**
 * Created by chrismccarthy on 4/6/15.
 */
/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('OpportunitySignInConfirmationCtrl', function ($scope, $modal, $modalInstance,
                                                             $stateParams, person, opportunity,
                                                             RecordedHours, $timeout,
                                                             Idle, Keepalive, Group) {

    $scope.groups = Group.all()

    $scope.opportunity = opportunity;
    $scope.photo_consent = true;

    $scope.hours = 1;

    $scope.timeDuration = function () {
      var attr = {};
      attr.hours = $scope.hours;
      attr.date_recorded = new Date().toString();
      if ($scope.opportunity_role !== undefined) {
      attr.opportunity_role_id = $scope.opportunity_role.id;
      } if ($scope.group !== undefined) {
        attr.group_id = $scope.group.id;
      }
      attr.person_id = person.id;
      attr.opportunity_id = $stateParams.opportunity_Id;
      attr.organization_id = opportunity.organization_id;
      attr.photo_consent = $scope.photo_consent;
      attr.sign_in  = true;
      RecordedHours.create(attr);
      $scope.confirmed = true;
      //$timeout(function() {
      //  $modalInstance.dismiss('cancel');
      //}, 1000)
    };


    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function (state) { return { abbrev: state }; });


    $scope.$watch('opportunity_role', function(){
      if ($scope.opportunity_role && $scope.opportunity_role.hours_required){
        $scope.hours = $scope.opportunity_role.hours_required;
      }
    });


    //Idle.watch();
    //
    //$scope.$on('IdleTimeout', function() {
    //  $scope.timeDuration();
    //});




  });

