/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
.controller('EmailVolunteersCtrl', [
'$scope','volunteers',
function($scope, volunteers) {
  console.log($scope);
  console.log(volunteers);
  console.log(JSON.parse(volunteers));


}
]);
