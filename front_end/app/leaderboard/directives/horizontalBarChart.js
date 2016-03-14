'use strict';

angular.module('voluntrApp')

.directive('horizontalBarChart', function() {
  function link(scope,element,attrs) {
    //Conventional D3 Margin
    var margin = {top: 20, right: 30, bottom: 30, left: 40};
    var width = 450 - margin.left - margin.right;
    var height = 550 - margin.top - margin.bottom;

    var barHeight = 40;

    //Boilerplate chart append
    var chart = d3.select(element[0]).append('svg')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    scope.$watch('data', function(data) {
      if (!data) return;
      console.log(data);

      var x = d3.scale.linear()
                .domain([0,d3.max(data, function(d) {return d.hours;})])
                .range([0,width]);

      var bar = chart.selectAll('.bar')
                      .data(data)
                    .enter().append("g")
                      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

      bar.append("rect")
         .attr("width", function(d) {return x(d.hours);})
         .attr("height", barHeight-1);

     bar.append("text")
        .attr("x", 5)
        .attr("y", barHeight/2)
        .attr("dy", ".35em")
        .attr("fill", "#FFFFFF")
        .text(function(d) { return d.name; });


    bar.append("text")
       .attr("x", function(d) { return x(d.hours) + 5; })
       .attr("y", barHeight/2)
       .attr("dy", ".35em")
       .text(function(d) { return d.hours + "hrs/person"; });


      console.log(data);
    });
  }
  return {
    restrict: 'E',
    scope: {data: '='},
    link: link
  };
});
