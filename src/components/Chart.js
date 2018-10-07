import React, { Component } from 'react';
import { Line, Chart as ReactChart } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

class Chart extends Component {

    constructor(props){
        super(props);
        this.state = {
            chartData: []
        }
    }

    

  render() {

    const {current, collected} = this.props;

    return (
      <Line
      duration="1000000"
        data={{
          datasets: [{
            label: 'Donaciones',
            backgroundColor: ReactChart.helpers.color(chartColors.purple).alpha(0.5).rgbString(),
            fill: true,
            lineTension: 0,
            borderDash: [8, 4],
            data: []
            }]
        }}
        options={{
          scales: {
            xAxes: [{
              type: 'realtime',
              realtime: {
                  duration: 200000,
                  refresh: 1500,
                  delay: 1000,        // delay of 1000 ms, so upcoming values are known before plotting a line
                  pause: false,
                  ttl: undefined,
                  onRefresh: (chart) => {

                    const amount = localStorage.getItem('totalData');
                    console.log(amount);
                    // query your data source and get the array of {x: timestamp, y: value} objects
                    //var data = [{x: Date.now(), y: amount}]
                    chart.data.datasets.forEach(function(dataset) {
                        dataset.data.push({
                          x: Date.now(),
                          y: amount
                        });
                      });
                }
              }
            }]
          },
          plugins: {
            streaming: {            // per-chart option
                frameRate: 30       // chart is drawn 30 times every second
            }
            }
        }
    }
      />
    );
  }
}


export default Chart;