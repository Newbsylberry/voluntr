angular.module('voluntrApp').directive("personModal", function ($modal) {
    link: function link(scope, element, attrs) {
      element.bind('click', function () {
        var personDetailModal = $modal.open(
          {
            templateUrl: 'organizations/modals/person_detail_modal.html',
            controller: 'PersonDetailCtrl',
            windowClass: 'add-event-modal-window',
            size: attrs.size,
            resolve: {
              id: function () {
                return attrs.id
              }
            }

          });


        personDetailModal.result.then(function () {

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
