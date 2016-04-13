/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
.controller('EmailVolunteersCtrl', [
'$rootScope','$scope','volunteers', 'role',
function($rootScope, $scope, volunteers, role) {

  $scope.data = {
    viewEmails: false,
    role: role || "All Volunteers for this Opportunity"
  };
  $scope.email = {};

  volunteers = JSON.parse(volunteers);

  $scope.volunteers = volunteers.map(mapVolunteers);

  $scope.showVolunteers = function() {
    $scope.data.viewEmails = !$scope.data.viewEmails
  };

  $scope.sendEmail = function() {
    //Send Email
    $rootScope.$broadcast('openOpportunityDetail');
  };

  function mapVolunteers(vol) {
    if (vol.email) {
      return {
        first_name: vol.first_name || null,
        last_name: vol.last_name || null,
        email: vol.email
      };
    } else {
      return;
    }

  }


}
]);
