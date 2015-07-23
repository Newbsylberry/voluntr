angular.module('voluntrApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, searchService,$window,
                                      $mdSidenav, $http, $stateParams, $timeout, $modal) {


    $scope.search_filter = searchService.search;


    $scope.open = function() {
      $mdSidenav('left').open()
        .then(function () {
          $scope.menu_open = true;
          console.log($scope.menu_open)
        });
    }

    var resultsFormat = function(raw_result) {
      var base_result = raw_result._source
      var result = {}
      if (raw_result._type == "organization_person" &&
        base_result.person &&
        base_result.person.first_name && base_result.person.first_name ) {
        result.id = base_result.person_id;
        result.type = "person";
        result.title = base_result.person.first_name + " " + base_result.person.last_name;
      } else if (raw_result._type == "opportunity") {
        result.id = base_result.id;
        result.type = "opportunity";
        result.title = base_result.name;
      }
      $scope.results.push(result)
    };

    $scope.loading = false;
    $scope.$watch('search_query', function () {
      $scope.results = [];
      if ($scope.search_query && !$scope.loading) {
        $scope.searching = true;
        $scope.loading = true;
        $http({
          url: 'api/v1/organizations/' + $stateParams.organization_Id + '/search',
          params: {query: $scope.search_query}
        }).
          success(function(data, status, headers, config) {
            angular.forEach(data, resultsFormat)
            $scope.loading = false;
          }).
          error(function(data, status, headers, config) {
          });
      } else if (!$scope.search_query) {
        $scope.searching = false;
      }
    });

    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $scope.menu_open = false;
        });
    };

    $scope.openModal = function(result) {
      if (result.type === 'person') {
        var personDetailModal = $modal.open(
          {
            templateUrl: 'organizations/modals/person_detail_modal.html',
            controller: 'PersonDetailCtrl',
            windowClass: 'add-event-modal-window',
            size: 'lg',
            resolve: {
              id: function () {
                return result.id
              }
            }

          });


        personDetailModal.result.then(function () {

          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          });
      } else if (result.type === 'opportunity') {
        var opportunityDetailModal = $modal.open(
          {
            templateUrl: 'organizations/modals/opportunity_detail_modal.html',
            controller: 'OpportunityDetailCtrl',
            windowClass: 'add-event-modal-window',
            size: 'lg',
            resolve:
            {
              id: function () {
                return result.id
              },
              start_time: function() {
                  return 0
                }
              }

          });



        opportunityDetailModal.result.then(function () {

          },
          function () {
            console.log('Modal dismissed at: ' + new Date());
          });
      }
    };

    


  });


