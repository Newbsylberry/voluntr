angular.module('voluntrApp').directive("emailLink", function ($mdDialog) {
  link: function link(scope, element, attrs) {
    element.bind('click', function () {
      console.log(attrs);
      console.log(attrs.role);
      var emailModal = $mdDialog.show({
        controller: 'EmailVolunteersCtrl',
        templateUrl: 'organizations/modals/email_volunteers.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        locals: {
          volunteers: attrs.volunteers,
          role: attrs.role
        }
      });
    });
  }
  return {
    link:  link
  }
});
