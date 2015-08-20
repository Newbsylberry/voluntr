angular.module('voluntrApp').directive("groupModal", function ($modal) {
  link: function link(scope, element, attrs) {
    element.bind('click', function () {
      var groupDetailModal = $modal.open(
        {
          templateUrl: 'organizations/modals/group_detail_modal.html',
          controller: 'GroupDetailCtrl',
          windowClass: 'add-event-modal-window',
          size: attrs.size,
          resolve: {
            id: function () {
              return attrs.id
            }
          }

        });


      groupDetailModal.result.then(function () {

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
