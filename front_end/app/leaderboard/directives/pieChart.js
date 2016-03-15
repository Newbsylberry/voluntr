'use strict';

angular.module('voluntrApp')

.directive('pieChart', function() {
  function link(scope,element,attrs) {
    //Conventional D3 Margin
    var margin = {top: 5, right: 5, bottom: 5, left: 5};
    var width = 100 - margin.left - margin.right;
    var height = 100 - margin.top - margin.bottom;

    //Boilerplate chart append
    var chart = d3.select(element[0]).append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
              .append('g')
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    var color = d3.scale.ordinal()
                    .range(['#333333','#555555']);

    var radius = Math.min(width,height) / 2;

    var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(radius * 0.9);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });


    scope.$watch('data', function(data) {
      if (!data) return;

      data = [
        data,
        {
          value: 100 - data.value
        }
      ];

      var arcs = chart.selectAll('.arc')
                   .data(pie(data))
                 .enter().append('g')
                   .attr('class', 'arc');

      arcs.append('path')
       .attr('d', arc)
       .style('fill', function(d,i) { return color(i); });;


     chart.append('text')
          .attr('x', 0)
          .attr('y', 0)
          .style('text-anchor', 'center')
          .style('fill', '#FFFFFF')
          .text(data[0].value + '%');


    });

  }

  return {
    restrict: 'E',
    scope: {data: '='},
    link: link
  };
});
