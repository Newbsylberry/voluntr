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

    //$http.get('api/v1/organizations/' + $stateParams.organization_Id + '/people' ).
    //  success(function(data, status, headers, config) {
    //    $scope.loaded = true;
    //    $scope.people = data;
    //  }).
    //  error(function(data, status, headers, config) {
    //
    //  });

    //Organization.people($stateParams.organization_Id, 'people').$promise.then(function(data) {
    //      $scope.loaded = true;
    //      $scope.people = data;
    //})


    Organization.get({organization_Id: $stateParams.organization_Id}).$promise.then(function(data){
      $scope.total_people_count = data.total_people;
    })

    $scope.selected = [];

    $scope.filter = {
      options: {
        debounce: 500
      }
    };

    $scope.query = {filter: '',limit: '5',order: 'first_name',page: 1};

    function success(people) {

      $scope.people = people;
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
          console.log(data)
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
      if ($scope.query.contact_only == true) {
        $scope.pre_filter_people_count = $scope.total_people_count;
        $scope.people = $filter('filter')($scope.people, {contact_information_completed:true})
        $scope.total_people_count = $scope.people.length;
      } else {
        getPeople();
        $scope.total_people_count = $scope.pre_filter_people_count;
      }
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
