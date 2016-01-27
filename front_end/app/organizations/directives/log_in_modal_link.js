angular.module('voluntrApp').directive("logInModal", function ($modal) {
  link: function link(scope, element, attrs) {
    element.bind('click', function () {
      var emailRegistrationModal = $modal.open(
        {
          templateUrl: 'organizations/modals/log_in.html',
          controller: 'EmailLogInCtrl',
          windowClass: 'log-in-modal',
          size: 'sm'
        });

      emailRegistrationModal.result.then(function () {

        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    });
  }
  return {
    link:  link
  }
})
