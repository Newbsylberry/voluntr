'use strict';

/**
 * @ngdoc function
 * @name voluntrApp.controller:LandingPageOrganizationsCtrl
 * @description
 * # LandingPageOrganizationsCtrl
 * Controller of the voluntrApp
 */
angular.module('voluntrApp')
  .controller('PersonDetailCtrl', function ($scope, Facebook, $http,
                                            $stateParams, id, People,
                                            $timeout, OrganizationPerson, uiCalendarConfig) {

    var addRecordedHoursToDash = function (recorded_hour) {
      if (recorded_hour.date_recorded  != null) {
        $scope.personStatisticGraphConfig.series[0].data.push
        ([Date.parse(recorded_hour.date_recorded), recorded_hour.hours])
      }
    };

    var addToPersonOpportunitiesChart = function (person_opportunity) {
      $scope.personOpportunitiesChart.series[0].data.push
      ([person_opportunity.opportunity.name, person_opportunity.total_hours]);
    };

    OrganizationPerson.get_by_organization_and_person_id($stateParams.organization_Id, id).$promise.then(function(successResponse) {
      $scope.organization_person_id = successResponse.id;
      $scope.person = successResponse.person;
      $scope.schedule = successResponse.person.schedule_update_form_settings;
      $scope.person.notes = successResponse.notes;
      People.recorded_hours(id, 'recorded_hours').$promise.then(function(recorded_hours) {
        $scope.person.recorded_hours = recorded_hours;
        angular.forEach(recorded_hours, addRecordedHoursToDash)
      });

      People.opportunities(id, 'opportunities').$promise.then(function(opportunities) {
        $scope.person.opportunities = opportunities;
        angular.forEach($scope.person.opportunities, addToPersonOpportunitiesChart)
      });
    });

    $scope.custom_calendar = {};
    $scope.custom_calendar.repeat = {};

    $scope.eventSources = [
      {
        url: 'api/v1/people/' + id + '/person_availability_schedule'
      },
      []
    ];

    $scope.uiConfig = {
      myCalendar:{
        height: 325,
        editable: true,
        eventTextColor: 'white',
        defaultView: 'month',
        header:{
          left: 'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        businessHours :
        {
          start: '7:00', // a start time (10am in this example)
          end: '20:00', // an end time (6pm in this example)

          dow: [ 1, 2, 3, 4, 5 ]
          // days of week. an array of zero-based day of week integers (0=Sunday)
          // (Monday-Thursday in this example)
        }
      }
    };

    $scope.updateWithSchedule = function() {
      var attr = {};
      attr.id = $scope.person.id;
      attr.schedule = $scope.schedule;
      People.update(attr).$promise.then(function(person){
        $scope.edit_schedule = false;
        // uiCalendarConfig.calendars['calendar'].fullCalendar('removeEventSource');
        // uiCalendarConfig.calendars['calendar'].fullCalendar('addEventSource', $scope.eventSources);
        uiCalendarConfig.calendars['calendar'].fullCalendar('refetchEvents', $scope.eventSources);
        console.log("hello")
      });
    };

    $scope.personStatisticGraphConfig =
    {
      options: {
        chart: {
          type: 'spline',
          zoomType: "xy",
          renderTo: 'container'
        }
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        allowDecimals: false,
        floor: 0
      },
      series: [
        {
          name: 'Recorded Hours',
          data: []
        }
      ],
      title: {
        text: "Person Dashboard"
      },
      loading: false,
      noData: "This Person Hasn't Volunteered Yet!",
      size: {
        height: "250"
      }
    };

    $scope.personOpportunitiesChart = {
      options: {
        chart: {
          type: 'pie',
          zoomType: "xy"
        }
      },
      series: [
        {
          name: 'Recorded Hours',
          data: []
        }
      ],
      title: {
        text: "Person Opportunities Distribution"
      },
      loading: false,
      size: {
        height: "250"
      }
    };
    $timeout(function(){window.dispatchEvent(new Event('resize')), 50})


  });
