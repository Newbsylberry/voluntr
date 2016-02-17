angular.module('voluntrApp').directive("organizationModal", function ($modal) {
  link: function link(scope, element, attrs) {
    element.bind('click', function () {
      var organizationDetailModal = $modal.open(
        {
          templateUrl: 'organizations/modals/public_organization_details.html',
          controller: 'OrganizationDetailCtrl',
          windowClass: 'organization-detail-window',
          size: 'lg',
          resolve: {
            url: function () {
              return attrs.url
            }
          }

        });


      organizationDetailModal.result.then(function () {

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
