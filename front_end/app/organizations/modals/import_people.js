'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('ImportPeopleModalCtrl', function ($scope, $modalInstance, $http, $state,
                                          $localStorage, import_information) {



    $scope.query = {limit: 5,order: 'first_name',page: 1};
    console.log($scope.query.limit)

    $scope.selected = [];

    $scope.query = {
      filter: '',
      order: 'first_name',
      limit: 5,
      page: 1
    };

    $scope.onOrderChange = function(){

    };

    $scope.onPaginate = function (page, limit) {

    };

    $scope.people = import_information.people;

    $scope.import = function(){
      $http.post('/api/v1/people/import', import_information).then(function(response) {
        $scope.imported = true;
        $state.go('organizations.people_home', {organization_Id:$stateParams.organization_Id})
        $scope.success_message = response.data.success_message;
      });
      $modalInstance.close()
    };

    $scope.redoMappings = function(){
      $modalInstance.close()
    };

    $scope.filter = {
      options: {
        debounce: 500
      }
    };




  });
