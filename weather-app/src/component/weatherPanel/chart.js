import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


// create the chart
var chart = Highcharts.chart('charts', {
    chart: {
        events: {
            redraw: function () {
                var label = this.renderer.label('The chart was just redrawn', 100, 120)
                    .attr({
                        fill: Highcharts.getOptions().colors[0],
                        padding: 10,
                        r: 5,
                        zIndex: 8
                    })
                    .css({
                        color: '#FFFFFF'
                    })
                    .add();

                setTimeout(function () {
                    label.fadeOut();
                }, 1000);
            }
        }
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
});

export default chart;