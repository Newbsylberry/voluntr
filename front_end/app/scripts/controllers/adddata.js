'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:AdddatactrlCtrl
 * @description
 * # AdddatactrlCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('AddDataCtrl', function ($scope, organization, Facebook, $filter) {






    $scope.organization = organization;
    $scope.toggleImpressionDataOnLineGraph = function(posts, insight_type, name) {
      var newSeries = {
        name: name,
        data: []
      };
      var facebookRequests = [];
 //     for (var i = posts.length - 1; i >= 0; i--) {
 //       var post = posts[i];
       angular.forEach(posts, function (post) {
        var newDataPoint = [];
        if (insight_type !== 'shared_post') {
          var facebookRequest = {
            "method": "GET",
            "relative_url": "/" + post.id + "/insights/" + insight_type + "/lifetime"
          };
        } else if (insight_type === 'shared_post') {
          var facebookRequest = {
            "method": "GET",
            "relative_url": "/" + post.id + "/sharedposts/"
          };
        }
        newDataPoint[0] = post.created_time;
        facebookRequests.push(facebookRequest);
        newSeries.data.push(newDataPoint)
      });
      Facebook.api('/', 'POST', {
        batch: facebookRequests,
        include_headers: false
      }, function (response) {
        for (var i = response.length - 1; i >= 0; i--) {
          var indiv_response = response[i];
          var post_insight = JSON.parse(indiv_response.body);
          if (insight_type !== 'shared_post') {
            newSeries.data[i][1] = post_insight.data[0].values[0].value;
          } else if (insight_type === 'shared_post') {
            newSeries.data[i][1] = post_insight.data.length;
          }
        }
      });

        //  Facebook.api('/' + post.id + '/insights/' + insight_type + '/lifetime', function(response) {
        //  }).then(function(result){
        //    console.log('data returned' + posts.indexOf(post))
        //    console.log($filter('date')(post.created_time, ' MMM dd '));
        //    newSeries.data.push
        //    ([post.created_time, result.data[0].values[0].value])
        //    $scope.lineGraphConfig.series.push(newSeries)
        //  });
        //}
        //if (insight_type === 'shared_post') {
        //  Facebook.api('/' + post.id + '/sharedposts', function(response) {
        //    newSeries.data.push
        //    ([post.created_time, response.data.length])
        //  })
        //}
        $scope.lineGraphConfig.series.push(newSeries)
        console.log(newSeries.data)
        console.log($scope.lineGraphConfig.series);

    };

  });
