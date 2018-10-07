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
            collected: localStorage.getItem('totalData')
        }
    }

    formatMoney = (n) => {
        return "$ " + (Math.round(n * 100) / 100).toLocaleString();
    }
        

  render() {

    const {current} = this.props;
    const {collected} = this.state;

    return (
        <div>
            <div data-aos="fade-right">
                <h1 style={{color: 'purple'}}>Cifra recolectada</h1> 
                <h2 style={{color: 'purple'}}>{ this.formatMoney(current)}</h2>
            </div>
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
                  duration: 100000,
                  refresh: 3000,
                  delay: 1500,        // delay of 1000 ms, so upcoming values are known before plotting a line
                  pause: false,
                  ttl: 200000,
                  onRefresh: (chart) => {

                    //const amount = current;
                    //this.setState({collected: amount})
                    /// console.log(amount);
                    const fakeAmount = (Date.now() / 10000000) * (Math.random()  * 1) + 1.005;
                    // query your data source and get the array of {x: timestamp, y: value} objects
                    console.log(Date.now())
                    var data = [{x: Date.now(), y: fakeAmount}]
                    //console.log(data)
                    // append the new data array to the existing chart data
                    Array.prototype.push.apply(chart.data.datasets[0].data, data);
                    //this.setState({collected: amount});
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
        </div>
      
    );
  }
}


export default Chart;
