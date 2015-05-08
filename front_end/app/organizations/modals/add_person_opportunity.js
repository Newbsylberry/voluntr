/**
 * Created by chrismccarthy on 3/17/15.
 */
'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('AddOpportunityPersonCtrl', function ($scope, Facebook, $stateParams,
                                                 $http, $state, opportunity, PersonOpportunity,
                                                 $modal, person, start_time) {


    $scope.opportunity = opportunity;
    $scope.opportunity.repeat_intervals = [1, 2, 3, 4]
    $scope.opportunity.active_days = [];





    // $scope.customFields = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    $scope.scheduled_days = {
      "Monday": false,
      "Tuesday": false,
      "Wednesday": false,
      "Thursday": false,
      "Friday": false,
      "Saturday": false,
      "Sunday": false
    };

    var setActiveDays = function(day) {
      if (day === "MO") {
        $scope.opportunity.active_days.push("Monday")
      } else if (day === "TU") {
        $scope.opportunity.active_days.push("Tuesday")
      } else if (day === "WE") {
        $scope.opportunity.active_days.push("Wednesday")
      } else if (day === "TH") {
        $scope.opportunity.active_days.push("Thursday")
      } else if (day === "FR") {
        $scope.opportunity.active_days.push("Friday")
      } else if (day === "SA") {
        $scope.opportunity.active_days.push("Saturday")
      } else if (day === "SU") {
        $scope.opportunity.active_days.push("Sunday")
      };
    };

    if (opportunity.ical) {
    angular.forEach(opportunity.ical.BYDAY, setActiveDays)
    }


    $scope.addOpportunityPerson = function() {
      var attr = {};
      attr.person_id = person.id;
      attr.opportunity_id = opportunity.id;
      if (opportunity.ical) {
      attr.repeat_count = opportunity.ical.INTERVAL * $scope.newPersonOpportunity.repeat_count;
      if (opportunity.ical.FREQ === "DAILY") {
        attr.daily = true;
      } else if (opportunity.ical.FREQ === "WEEKLY") {
        attr.weekly = true;
      } else if (opportunity.ical.FREQ === "MONTHLY") {
        attr.monthly = true;
      }
      attr.start_time = new Date(start_time).getTime();
      attr.repeat_days = [];
      if ($scope.scheduled_days.Sunday) {
        attr.repeat_days.push(0)
      };
      if ($scope.scheduled_days.Monday) {
        attr.repeat_days.push(1)
      } if ($scope.scheduled_days.Tuesday) {
        attr.repeat_days.push(2)
      } if ($scope.scheduled_days.Wednesday) {
        attr.repeat_days.push(3)
      } if ($scope.scheduled_days.Thursday) {
        attr.repeat_days.push(4)
      } if ($scope.scheduled_days.Friday) {
        attr.repeat_days.push(5)
      } if ($scope.scheduled_days.Saturday) {
        attr.repeat_days.push(6)
      }
      }
      PersonOpportunity.create(attr)

    };



  });
