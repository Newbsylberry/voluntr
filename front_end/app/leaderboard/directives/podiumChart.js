angular.module('voluntrApp')

.directive('podiumChart', function() {
  function link(scope,element,attrs) {
    //Conventional D3 Margin
    var margin = {top: 5, right: 5, bottom: 5, left: 0};
    var width = 375 - margin.left - margin.right;
    var height = 110 - margin.top - margin.bottom

    var barWidth = width / 3;

    //Boilerplate chart append
    var chart = d3.select(element[0]).append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
              .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    scope.$watch('data', function(data) {
      if (!data) return;

      data = [data[0],data[1],data[2]];

      var color = d3.scale.ordinal()
                      .range(['#444444','#333333', '#555555']);

      data = [data[1],data[0],data[2]];
      console.log(data);

      var bar = chart.selectAll('.bar')
                   .data(data)
                 .enter()
                   .append('g')
                   .attr('transform', function(d,i) { return 'translate('+ i * barWidth + ',20)'; });

     bar.append('rect')
        .attr('width', barWidth-1)
        .attr('height', function(d,i){
          if (i === 0) return 60;
          if (i === 1) return 80;
          if (i === 2) return 40;
        })
        .attr('y', function(d,i){
          if (i === 0) return 40;
          if (i === 1) return 20;
          if (i === 2) return 60;
        })
        .attr('fill', function(d,i) {return color(i);});

     bar.append('text')
        .attr('x', barWidth/2)
        .attr('y', 80)
        .attr('fill','#FFFFFF')
        .attr('text-anchor', 'middle')
        .text(function(d) { return d.value; })

     bar.append('text')
        .attr('x', barWidth/2)
        .attr('y', function(d,i) {
          if (i === 0) return 30;
          if (i === 1) return 10;
          if (i === 2) return 50;
        })
        .attr('fill','#FFFFFF')
        .attr('text-anchor', 'middle')
        .text(function(d) { return d.name; })

    });
  }

  return {
    restrict: 'E',
    scope: {data: '='},
    link: link
  };
});
