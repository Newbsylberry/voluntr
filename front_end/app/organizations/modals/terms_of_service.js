angular.module('voluntrApp')
  .controller('TOSCtrl', function ($scope, Organization, $modalInstance, organization_id, $sce) {


    Organization.get(
      {organization_Id: organization_id}, function (successResponse) {
        $scope.organization = successResponse;

        $scope.pdfUrl = $scope.organization.terms_of_service_file.terms_of_service_file.url;
      });

  });


