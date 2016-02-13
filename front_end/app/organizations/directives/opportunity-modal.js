angular.module('voluntrApp').directive("opportunityModal", function ($modal) {
  link: function link(scope, element, attrs) {
    element.bind('click', function () {
      var opportunityDetailModal = $modal.open(
        {
          templateUrl: 'organizations/modals/opportunity_detail.html',
          controller: 'OpportunityDetailCtrl',
          windowClass: 'add-event-modal-window',
          size: attrs.size,
          resolve:
          {
            id: function () {
              return attrs.id
            },
            start_time: function() {
              if (attrs.start_time) {
              return start_time;
              } else if (!attrs.start_time) {
                return 0
              }
            }
          }
        });



      opportunityDetailModal.result.then(function () {

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
