angular.module('voluntrApp')

.directive('stackedBarChart', function() {
  function link(scope,element,attrs) {
    //Conventional D3 Margin
    var margin = {top: 5, right: 5, bottom: 5, left: 5};
    var width = 375 - margin.left - margin.right;
    var height = 550 - margin.top - margin.bottom;

    //Boilerplate chart append
    var chart = d3.select(element[0]).append('svg')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var y = d3.scale.linear()
                    .range([0,height]);

    var color = d3.scale.ordinal()
                    .range(["#333333","#444444", "#555555"]);

    scope.$watch('data', function(data) {
      if (!data) return;


      y.domain([0,d3.sum(data,function(d){ return d.hours;})]);



      var y0 = 0;
      data.forEach(function(d) {
        d.y0 = y0;
        y0 += y(d.hours);
      });

      var bars = chart.selectAll('.bar')
                      .data(data)
                    .enter().append('rect')
                      .attr('class','bar')
                      .attr('height', function(d) {return y(d.hours);})
                      .attr('width', width-10)
                      .attr('x',5)
                      .attr('y', function(d) {return d.y0;})
                      .style('fill', function(d,i) {return color(i);});

      var text = chart.selectAll('.text')
                      .data(data);
                    text.enter()
                      .append('text')
                      .attr('class', 'text')
                      .attr('x', width/2)
                      .attr('y', function(d) { return d.y0+20; })
                      .attr('text-anchor', 'middle')
                      .text(function(d) { return d.name; });

                      text.enter().append('text')
                      .attr('class', 'text')
                      .attr('x', width/2)
                      .attr('y', function(d) { return d.y0+50; })
                      .attr('text-anchor', 'middle')
                      .text(function(d) { return d.hours + " hours" });

    });
  }

  return {
    restrict: 'E',
    scope: {data: '='},
    link: link
  };
});
