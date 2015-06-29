angular.module('voluntrApp').directive("emailTemplatePreview", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/organization_email_template.html',
    scope: {
      resourceId: "@"
    },
    restrict: 'E',
    controller: function ($scope, Opportunity, $modal) {

      $scope.openEmailPreview = function(size, emailTemplate) {
        var openEmailPreview = $modal.open(
          {
            templateUrl: 'organizations/modals/preview_organization_template_email.html',
            controller: 'PreviewEmailTemplateCtrl',
            windowClass: 'add-event-modal-window',
            size: size
          });

        openEmailPreview.result.then(function () {

          },
          function () {

            console.log('Modal dismissed at: ' + new Date());
          });

      };


    }
  }
});
