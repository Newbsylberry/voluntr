/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
.controller('EmailVolunteersCtrl', [
'$scope','volunteers', 'role',
function($scope, volunteers, role) {

  $scope.data = {
    role: role || "All Volunteers for this Opportunity"
  };
  $scope.email = {};

  console.log(JSON.parse(volunteers));

  $scope.volunteers = JSON.parse(volunteers);


}
]);
