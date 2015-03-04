'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('OrganizationRegistrationCtrl', function ($scope, Facebook, $http, Organization, $state, $stateParams) {

    $scope.log_in = function () {
      Facebook.login(function(response) {
        $scope.connected_to_facebook = true;
        $scope.oauth_key = response.authResponse.accessToken;
        console.log($scope.oauth_key)
      }, {scope: 'user_groups,read_insights,manage_pages'})
    };


    var listOrganization = function(organization) {
      if (!$scope.organizations) {
        var organizations = [];
        $scope.organizations = organizations;
      };
      Facebook.api('/' + organization.id + '/picture', {"type": "large"}, function (response) {
        organization.picture = response.data.url;
      });
      $http.get('/api/v1/organizations/existence_check/' + organization.id).
        success(function(data, status, headers, config) {
          if (data) {
            organization.exists = true
            organization.v_id = data.id;
          } else if (!data) {
            organization.exists = false
          }
        }).
        error(function(data, status, headers, config) {
        })
      $scope.organizations.push(organization)
    };


    Facebook.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        $scope.connected_to_facebook = true;
        $scope.oauth_key = response.authResponse.accessToken;
        console.log($scope.oauth_key);
      } else if (response.status !== 'connected') {
        $scope.connected_to_facebook = false;
      }
    });

    $scope.$watch('connected_to_facebook', function () {
      if ($scope.connected_to_facebook && !$scope.organizations){
        Facebook.api('/me/accounts', function (response) {
          angular.forEach(response.data, listOrganization)
        });
      }
    });


    $scope.addOrganization = function(organization) {
      $scope.organization = organization;
      var attr = {};
      attr.fb_id = organization.id;
      attr.name = organization.name;
      attr.about = organization.about;
      attr.initial_likes = organization.likes;
      attr.initial_talking_about
      var newOrganization =
        $http.post('/api/v1/organizations/',
          {
            "organization": {
              name: attr.name,
              fb_id: attr.fb_id,
              about: attr.about
            },
            "oauth_key": $scope.oauth_key
          }).
          success(function(data, status, headers, config) {
            console.log(data)
            if (data) {
              organization.exists = true
              organization.v_id = data.id;
            } else if (!data) {
              organization.exists = false
            }
          }).
          error(function(data, status, headers, config) {
          })
      newOrganization.$promise.then(function(data) {
        $scope.organization.v_id = data.id;
        $scope.organization.exists = true;
      })
    };

    $scope.organizationRegistration = function (organization) {
      $scope.organization_registration = true;
      Facebook.api('/' + organization.id + '/posts', function (response) {
        organization.post_count = response.data.length;
        // var url = response.paging.next;
        //for (var i = 1; i >= 0; i++) {
        //  $http({method: 'GET',
        //    url: url}).
        //    success(function(data, status, headers, config) {
        //      if (data.paging.next && url != data.paging.next) {
        //        url = data.paging.next;
        //      } else {
        //        url = null;
        //      };
        //    }).
        //    error(function(data, status, headers, config) {
        //    })
        //  if (!url) {
        //    console.log("Hello")
        //    break};
        //};

        //var facebookRequests = [];
        ////     for (var i = posts.length - 1; i >= 0; i--) {
        ////       var post = posts[i];
        //angular.forEach(posts, function (post) {
        //  var newDataPoint = [];
        //  if (insight_type !== 'shared_post') {
        //    var facebookRequest = {
        //      "method": "GET",
        //      "relative_url": "/" + post.id + "/insights/" + insight_type + "/lifetime"
        //    };
        //  } else if (insight_type === 'shared_post') {
        //    var facebookRequest = {
        //      "method": "GET",
        //      "relative_url": "/" + post.id + "/sharedposts/"
        //    };
        //  }
        //  newDataPoint[0] = post.created_time;
        //  facebookRequests.push(facebookRequest);
        //  newSeries.data.push(newDataPoint)
        //});
        //Facebook.api('/', 'POST', {
        //  batch: facebookRequests,
        //  include_headers: false
        //});



      });
      $scope.organization = organization;

    }

    $scope.organizationList = function () {
      $scope.organization_registration = false;
    };

  });
