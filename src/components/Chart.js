import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

class Chart extends Component {

  render() {

    const {amount} = this.props;

    return (
      <Line
      duration="1000000"
        data={{
          datasets: [{
            data: []
          }, {
            data: []
          }]
        }}
        options={{
          scales: {
            xAxes: [{
              type: 'realtime',
              realtime: {
                  duration: 200000,
                  refresh: 1000,
                  onRefresh: function(chart) {

                    // query your data source and get the array of {x: timestamp, y: value} objects
                    var data = [{x: Date.now(), y: amount}]
                    //console.log(data)
                    // append the new data array to the existing chart data
                    Array.prototype.push.apply(chart.data.datasets[0].data, data);
                }
              }
            }]
          },
          plugins: {
            streaming: {            // per-chart option
                frameRate: 30       // chart is drawn 30 times every second
            }
        }
        }}
      />
    );
  }
}


export default Chart;