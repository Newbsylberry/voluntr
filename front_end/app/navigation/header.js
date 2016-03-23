angular.module('voluntrApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, searchService,$window,
                                      $mdSidenav, $http, $stateParams, $timeout,
                                      $modal, $state, $localStorage, Organization, $mdDialog) {

    $scope.search_filter = searchService.search;




    $scope.supportModal = function(size){
      var supportModal = $modal.open(
        {
          templateUrl: 'organizations/modals/support_form.html',
          controller: 'SupportFormCtrl',
          windowClass: 'add-event-modal-window',
          size: size,
          resolve: {
            current_state: function() {
              return $scope.current_state;
            }
          }
        });
      supportModal.result.then(function () {

        },
        function () {

        });
    }

    $scope.logOut = function () {
      delete $localStorage.token;
      $state.go('landing_page')
    };

    $scope.open = function() {
      console.log("open")
      $mdSidenav('left').open()
        .then(function () {
          $scope.menu_open = true;
        });
    };

    var resultsFormat = function(raw_result) {
      var base_result = raw_result._source
      console.log(base_result)
      var result = {}
      if (raw_result._type == "organization_person" &&
        base_result.person &&
        base_result.person.first_name && base_result.person.first_name ) {
        result.id = base_result.person_id;
        result.type = "person";
        result.title = base_result.person.first_name + " " + base_result.person.last_name;
      } else if (raw_result._type == "opportunity") {
        result.id = base_result.id;
        result.start_time = base_result.start_time;
        result.type = "opportunity";
        result.title = base_result.name;
      }
      $scope.results.push(result)
    };

    $scope.$watch('search_query', function () {
      $scope.loaded = false;
      $scope.results = [];
      if ($scope.search_query && !$scope.loading) {
        $scope.loading = true;
        $scope.searching = true;
        $http({
          url: 'api/v1/organizations/' + $stateParams.organization_Id + '/search',
          params: {query: $scope.search_query}
        }).
          success(function(data, status, headers, config) {
            angular.forEach(data, resultsFormat)
            $scope.loading = false;
            $scope.loaded = true;
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
        $mdDialog.show({
          controller: 'OpportunityDetailCtrl',
          templateUrl: 'organizations/modals/opportunity_detail.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
          locals: {
            id: result.id,
            start_time: result.start_time,
            opportunity: $http.get('api/v1/opportunities/' + result.id, {params: {instance_date: new Date(result.start_time).getTime()}})
          }
        })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
      }
    };




  });


