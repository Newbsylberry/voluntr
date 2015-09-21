'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('PeopleHomeCtrl', function ($scope, Facebook, $http,
                                          $stateParams, $modal, Organization, $filter) {

    $scope.loaded = false;

    $scope.selected = [];

    $scope.filter = {
      options: {
        debounce: 500
      }
    };

    $scope.query = {filter: '',limit: '5',order: 'first_name',page: 1,contact_only:false};

    function success(people) {
      $scope.people = people;
      angular.forEach(people, function(person){
        $scope.total_people_count = person.count;
      })
      $scope.loaded = true;
    }

    $scope.onChange = function () {
      return Organization.people(
        $stateParams.organization_Id,
        'people',
        $scope.query
      ).$promise.then(function(data, status, headers, config) {
          $scope.loaded = true;
          success(data)
        })
    };

    $scope.onPaginationChange = function(){
      return Organization.people(
        $stateParams.organization_Id,
        'people',
        $scope.query
      ).$promise.then(function(data, status, headers, config) {
          $scope.loaded = true;
          success(data)
        })
    };

    function getPeople() {
      $scope.deferred = $scope.onChange();
    }

    $scope.removeFilter = function () {
      $scope.filter.show = false;
      $scope.query.filter = '';

      if($scope.filter.form.$dirty) {
        $scope.filter.form.$setPristine();
      }
    };

    $scope.$watchGroup(['query.filter', 'query.order', 'query.limit'], function (newValue, oldValue) {
      if(!oldValue) {
        var bookmark = $scope.query.page;
      }

      if(newValue !== oldValue) {
        $scope.query.page = 1;
      }

      if(!newValue) {
        $scope.query.page = bookmark;
      }
      getPeople();
    })


    $scope.filterByContactInformation = function() {
      getPeople();
  };


    $scope.bulkAddPeople = function (size) {
      var bulkAddModal = $modal.open(
        {
          templateUrl: 'organizations/modals/bulk_add_people_modal.html',
          controller: 'BulkAddPeopleCtrl',
          windowClass: 'add-event-modal-window',
          size: size
        });
      bulkAddModal.result.then(function () {

        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    };




  });
