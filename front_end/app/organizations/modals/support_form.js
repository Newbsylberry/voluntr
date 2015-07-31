angular.module('voluntrApp')
  .controller('SupportFormCtrl', function ($scope, $rootScope, searchService,$window, $http,
                                           $stateParams, $timeout, $modal, current_state, $modalInstance) {
    $scope.current_state = current_state;

    $scope.submitFeedback = function(){
      var attr = {};
      attr.email = $scope.email;
      attr.description = $scope.description;
      attr.current_state = current_state;
      $http.post('api/v1/administration/feedback',{data: attr}).$promise
        .then(function(data) {

        })
      $modalInstance.close();
    };





  });


