/**
 * Created by chrismccarthy on 3/9/15.
 */
angular.module('voluntrApp')
  .controller('OrganizationSearchCtrl', function ($scope, $modal, $rootScope, $http, $stateParams,
                                                  searchService, $window) {


    $scope.query = searchService.search;

    var addToSearch = function(object) {
      if (!$scope.search_items) {
      $scope.search_items = [];
      }
      var search_item = {};
      search_item.id = object.id
      if (object.first_name) {
        search_item.name = object.first_name + " " + object.last_name
        search_item.result_type = "Volunteer"
        if (object.fb_id) {
          search_item.fb_id = object.fb_id;
        }
        $scope.search_items.push(search_item);
      } else if (object.opportunity_type_id) {
        search_item.result_type = "Opportunity"
        search_item.name = object.name;
        search_item.description = object.description;
        $scope.search_items.push(search_item);
      }
    };



    $http.get('api/v1/organizations/' + $stateParams.organization_Id + '/people' ).
      success(function(data, status, headers, config) {
        angular.forEach(data, addToSearch)
      }).
      error(function(data, status, headers, config) {
        console.log(data)
      });

    $http.get('api/v1/organizations/' + $stateParams.organization_Id + '/opportunities' ).
      success(function(data, status, headers, config) {
        angular.forEach(data, addToSearch)
      }).
      error(function(data, status, headers, config) {
        console.log(data)
      });


  });
