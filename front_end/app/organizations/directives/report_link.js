angular.module('voluntrApp').directive("reportLink", function ($modal) {
  link: function link(scope, element, attrs) {
    element.bind('click', function () {
      var reportModal = $modal.open(
        {
          templateUrl: 'organizations/modals/generate_report.html',
          controller: 'GenerateReportCtrl',
          windowClass: 'add-event-modal-window',
          size: 'sm',
          resolve: {
            rm_id: function () {
              return attrs.id
            }
          }

        });


      reportModal.result.then(function () {

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


