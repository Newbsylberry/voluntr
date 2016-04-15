angular.module('voluntrApp').directive("addPersonOpportunity", function () {
  return {
    transclude: true,
    templateUrl: 'organizations/directives/add_person_opportunity.html',
    scope: {
      type: "@",
      selectedObject: "=",
      opportunity: '=',
      instance: '='
    },
    restrict: 'E',
    controller: function ($scope,$mdDialog,$http,$stateParams,PersonOpportunity) {
      var lastSearchTime;
      var pendingSearch;
      var cancelSearch = angular.noop;
      var cachedQuery;
      $scope.openForm = function(opportunity_instances){
        $mdOpenMenu(opportunity_instances)
      };

      $scope.anything = [{name: "Jane Doe"},{name: "John Doe"}];
      $scope.contacts = [];
      $scope.search = function (query) {
        cachedQuery = cachedQuery || query;
        return cachedQeury ? $scope.anything.filter(createFilterFor(cachedQuery)) : [];
      }

      $scope.asyncSearch = function(query) {
        if (!pendingSearch || !debounceSearch()) {
          cancelSearch();
          return $http({
            url: 'api/v1/organizations/' + $stateParams.organization_Id + '/people_search',
            params: {query: query}
          })
          .then(function(response) {
            console.log(response);
            var filteredResponse = response.data.filter(function(object) {
              for (var i = 0; i < $scope.contacts.length; i++) {
                if($scope.contacts[i].id === object._source.person.id) {
                  return false;
                }
              }
              return true;
            });
            
            return mappedResponse = filteredResponse.map(function(object) {
              return {
                id: object._source.person.id,
                fullName: object._source.person.first_name + " " + object._source.person.last_name,
                email: object._source.person.email
              };
            });

            resetDebounce();
          })
        }
      }


      function resetDebounce() {
        lastSearchTime = 0;
        pendingSearch = null;
        cancelSearch = angular.noop;
      }

      function debounceSearch() {
        var now = new Date().getMilliseconds();
        lastSearchTime = lastSearchTime || now;
        return ((now - lastSearchTime) < 250);
      }

      function createFilterFor(query) {
        return function filterFn(contact) {
          return (contact.name.indexOf(query) != -1);
        }
      }

      $scope.person = {};
      $scope.person.person_id = {};

      $scope.person_opportunity = {};

      $scope.addPersonOpportunity = function(){
        var attr = {};
        attr.instances = [];
        attr.opportunity_id = $scope.opportunity.id;
        if ($scope.type !== 'instance'){
          attr.instances.push(new Date($scope.opportunity.instance_date));
        } else if ($scope.type === 'instance'){
          attr.instances.push(new Date($scope.selectedObject.instance_date));
        }
        if ($scope.type === 'role') {
          attr.opportunity_role_id = $scope.selectedObject.id;
        } else if ($scope.type !== 'role') {
          attr.opportunity_role_id = $scope.person_opportunity.opportunity_role;
        }
        if ($scope.person.person_id === {}) {
          attr.first_name = $scope.person.first_name;
          attr.last_name = $scope.person.last_name;
          if ($scope.person.email){
            attr.email = $scope.person.email;
          } else if ($scope.person.phone){
            attr.phone = $scope.person.phone;
          }
        } else if ($scope.person.person_id !== {}){
          attr.person_id = $scope.person.person_id;
        }
        PersonOpportunity.create(attr)
        $scope.person.first_name = '';
        $scope.person.last_name = '';
        $scope.person.email = '';
        $scope.person.phone = '';
        $scope.person_opportunity = {};
      }
    }
  }
});
