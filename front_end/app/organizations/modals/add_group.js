'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:AddeventcontrollerCtrl
 * @description
 * # AddeventcontrollerCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('AddGroupCtrl', function ($scope, $stateParams, $modalInstance,
                                        $state, Group, GroupAdministrator, People) {

    $scope.administrators = [];

    $scope.createAdministrator = function(person) {
      var attr = {};
      attr.email = person.email;
      attr.first_name = person.first_name;
      attr.last_name = person.last_name;
      $scope.administrators.push(attr)
      $scope.administrator.first_name = "";
      $scope.administrator.last_name = "";
      $scope.administrator.email = "";
      console.log($scope.administrators)
    };

    $scope.createGroup = function() {
      var attr = {};
      attr.name = $scope.createGroup.group_name;
      attr.description = $scope.createGroup.description;
      attr.city = $scope.createGroup.city;
      attr.state = $scope.createGroup.state;
      var group = Group.create(attr).$promise.then(function(group){
        angular.forEach($scope.administrators, function(administrator){
          console.log(administrator)
          var admin = {}
          admin.first_name = administrator.first_name;
          admin.last_name = administrator.last_name;
          admin.email = administrator.email;
          admin.organization_id = $stateParams.organization_Id;
          var person = People.create(admin).$promise.then(function(person){
            var group_admin = {};
            group_admin.person_id = person.id;
            group_admin.group_id = group.id;
            GroupAdministrator.create(group_admin).$promise.then(function(group_admin){
              console.log(group_admin)
            })
          })
        })
      });
        $state.go($state.current, {}, {reload: true});

      $modalInstance.close();
    };



  });
