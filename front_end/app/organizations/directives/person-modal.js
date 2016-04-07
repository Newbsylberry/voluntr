angular.module('voluntrApp').directive("personModal", function ($mdDialog) {
    link: function link(scope, element, attrs) {
      element.bind('click', function () {
        $mdDialog.show({
          controller: 'PersonDetailCtrl',
          templateUrl: 'organizations/modals/person_detail.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
          locals: {
            id: attrs.id
          }
        })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });

      });
    }
  return {
    link:  link
  }
});
