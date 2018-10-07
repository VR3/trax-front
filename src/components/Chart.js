import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

class Chart extends Component {

  render() {
    return (
      <Line
      duration="100000"
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
              type: 'realtime'
            }]
          }
        }}
      />
    );
  }
}


export default Chart;