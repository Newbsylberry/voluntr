angular.module('voluntrApp').directive("termsOfService", function ($modal) {
  link: function link(scope, element, attrs) {
    element.bind('click', function () {
      console.log(attrs)
      var termsOfServiceModal = $modal.open(
        {
          templateUrl: 'organizations/modals/terms_of_service.html',
          controller: 'TOSCtrl',
          windowClass: 'terms-of-service-modal',
          size: 'lg',
          resolve:
          {
            organization_id: function () {
              return attrs.organizationId
            }
          }
        });



      termsOfServiceModal.result.then(function () {

        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    });
  }
  return {
    link:  link
  }
});
