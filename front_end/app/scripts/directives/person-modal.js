angular.module('voluntrApp').directive("personModal", function ($modal) {
    link: function link(scope, element, attrs) {
      element.bind('click', function () {
        console.log(attrs)
        console.log("HELLLOOOO WORLD!")
        var personDetailModal = $modal.open(
          {
            templateUrl: 'organizations/people/person_detail_modal.html',
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
