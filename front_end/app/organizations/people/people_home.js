'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('PeopleHomeCtrl', function ($scope, Facebook, $http, $stateParams, $modal) {
    $http.get('api/v1/organizations/' + $stateParams.organization_Id + '/people' ).
      success(function(data, status, headers, config) {
         $scope.people = data;
      }).
      error(function(data, status, headers, config) {
        console.log(data)
      });



    $scope.personDetail = function (size, id) {
      var personDetailModal = $modal.open(
        {
          templateUrl: 'organizations/people/person_detail_modal.html',
          controller: 'PersonDetailCtrl',
          windowClass: 'add-event-modal-window',
          size: size,
          resolve:
          {
            id: function () {
              return id
            }
          }

        });



      personDetailModal.result.then(function () {

        },
        function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    };




  });
