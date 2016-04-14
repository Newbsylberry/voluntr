/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
.controller('EmailVolunteersCtrl', [
'$scope','volunteers', 'role','$http',
function($scope, volunteers, role,$http) {

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
    var attr = {};
    attr.volunteers = $scope.volunteers;
    attr.message = $scope.email.message;
    attr.subject = $scope.email.subject;
    $http({
      method: 'post',
      url: '/api/v1/administration/email_volunteers',
      data: attr
      }).then(function(data){
      console.log(data)
    });
    //Send Email
    // $scope.$emit('openOpportunityDetail');
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
