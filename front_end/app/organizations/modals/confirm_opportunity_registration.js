/**
 * Created by chrismccarthy on 4/6/15.
 */
/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('OpportunityRegistrationConfirmationCtrl', function ($scope, $modal, $modalInstance) {


    $scope.cancel = function () {

      $modalInstance.dismiss('cancel');
    };



  });

