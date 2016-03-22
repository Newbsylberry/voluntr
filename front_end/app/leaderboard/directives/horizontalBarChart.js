'use strict';

angular.module('voluntrApp')

.directive('horizontalBarChart', function() {
  function link(scope,element,attrs) {
    //Conventional D3 Margin
    var margin = {top: 5, right: 5, bottom: 5, left: 5};
    var width = 375 - margin.left - margin.right;
    var height = 130 - margin.top - margin.bottom;

    var barHeight = 40;

    //Boilerplate chart append
    var chart = d3.select(element[0]).append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
              .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var color = d3.scale.ordinal()
                    .range(['#333333','#444444', '#555555']);

    scope.$watch('data', function(data) {
      if (!data) return;

      data = [data[0],data[1],data[2]];

      var x = d3.scale.linear()
                .domain([0,d3.max(data, function(d) {return d.value;})])
                .range([0,width-80]);

      var bar = chart.selectAll('.bar')
                      .data(data)
                    .enter().append('g')
                      .attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')'; });

      bar.append('rect')
         .attr('width', function(d) {return x(d.value);})
         .attr('height', barHeight-1)
         .style('fill', function(d,i) { return color(i); });

      bar.append('text')
         .attr('x', 5)
         .attr('y', barHeight/2)
         .attr('dy', '.35em')
         .attr('fill', '#FFFFFF')
         .text(function(d) { return d.name; });


     bar.append('text')
        .attr('x', function(d) { return x(d.value) + 5; })
        .attr('y', barHeight/2)
        .attr('dy', '.35em')
        .text(function(d) { return d.value + 'hrs/person'; });

    });
  }
  return {
    restrict: 'E',
    scope: {data: '='},
    link: link
  };
});
