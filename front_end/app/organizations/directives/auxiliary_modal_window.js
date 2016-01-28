angular.module('voluntrApp').directive("auxiliaryModalWindow", function ($modal) {
  return {
    scope: {
      type: '@',
      id: '@',
      object: '='
    },
    link: function link(scope, element, attrs) {
      element.bind('click', function () {
        var groupDetailModal = $modal.open(
          {
            templateUrl: 'organizations/modals/auxiliary_modal_window.html',
            controller: 'AuxiliaryModalWindowCtrl',
            windowClass: 'auxiliary-modal-window',
            size: attrs.size,
            resolve: {
              type: function() {
                return scope.type
              },
              object: function(){
                return scope.object
              },
              object_id: function(){
                return scope.id
              }
            }
          });
        groupDetailModal.result.then(function () {
          },
          function () {
            queryResult[0].classList.remove('auxiliary-open')
          });
        var queryResult = document.getElementsByClassName("modal-dialog")
        queryResult[0].classList.add('auxiliary-open')
      });
    }
  }
});
