angular.module('voluntrApp').directive("reportLink", function ($modal) {
  link: function link(scope, element, attrs) {
    element.bind('click', function () {
      var reportModal = $modal.open(
        {
          templateUrl: 'organizations/modals/generate_report.html',
          controller: 'GenerateReportCtrl',
          windowClass: 'generate-report-window',
          size: 'sm',
          resolve: {
            rm_id: function () {
              return attrs.id
            },
            type: function(){
              return attrs.type
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


