import React, { Component } from 'react';
import AOS from 'aos';
import './App.css';
import {Transactions, Notification, Chart, Collected} from './components';
import NumberFormat from 'react-number-format';
import Whiteline from './Whiteline.png';
import { Line, Circle } from 'rc-progress';


class App extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      collected: [{x: Date.now(), y: 0}],
      expected: null,
      current: null,
      rate: null,
      dateOptions: [],
    }
    this.groupBy = this.groupBy.bind(this);
  }

  getData = () => {
    fetch('https://trax-teleton.herokuapp.com/api/collected', {
        method: 'get',
        mode: 'cors',
    }).then((response) => {
        return response.json();
    }).then((res) => {
        const collected = res[0].collected;
        const dataCollected = {x: Date.now(), y: collected};
        localStorage.clear()
        localStorage.setItem('totalData', collected);
        this.setState({
          current: collected,
          collected: [this.state.collected[0], dataCollected],
          rate: (this.state.expected - collected) / this.state.expected * 100
        });
    }).catch((err) => {
        console.log(err);
    });

    fetch('https://trax-teleton.herokuapp.com/api/donations', {
      method: 'get',
    })
    .then(res => res.json())
    .then((res) => {
      console.log('options', this.groupBy(res, 'hour'))
      this.setState({dateOptions: this.groupBy(res, 'hour')});
    });
  }
  
  groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  componentWillMount() {
    AOS.init();
    this.getData();
    this.setState({
      expected: 456013740})
  }

  addToCollected = (amount) => {
    const lastValue = (this.getLatestAmount() + amount)
    const newTx = {x: Date.now(), y: lastValue};
    console.log(newTx);
    const newObj = this.state.collected.slice()
    this.setState({
      collected: [newObj, newTx],
      current: this.state.current + amount,
    })
    this.calculateRate();
  }

  getLatestAmount = () => { 
    const {collected} = this.state;
    return collected[collected.length - 1].y;
  }

  calculateRate = () => {
    const { expected, current } = this.state;
    const rate = (expected - current) / expected;
    this.setState({
      rate: rate * 100
    })
    console.log(rate);
    const appRate = document.getElementById('root').style.setProperty('--growth', 1 - rate)
    console.log('AppRate', appRate);
  }

  render() {
    const { collected, expected, current, rate, dateOptions } = this.state;
    return (
      <div className="App">
      <section id="section01">
      <div className="lds-circle" style={{zIndex: 10}}></div>
        <header className="App-header0">
            <h1 style={{
              color: 'purple',
              fontSize: '1.5em',
              textAlign: 'left',
              width: '30%',
              alignSelf: 'center'
            }}>¿Cómo beneficia mi donación?</h1>
            <div style={{
              color: 'purple',
              padding: '20px',
              textAlign: 'center'
            }}>

            </div>
        </header>
        <header className="App-header1">
          <div style={{
            padding: '40px',
            alignSelf: 'flex-start',
            color: '#92007b',
            padding: '20px'
          }}>
            <h4>Nuestra meta este año</h4>
            <h1><NumberFormat value={expected} displayType={'text'} decimalScale={4} thousandSeparator={true} prefix={'$'} /></h1>
          </div>
          <div style={{
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            color: '#ff6837',
            padding: '20px'
          }}>
            <h4>Hemos logrado</h4>
            <h2><NumberFormat value={current} displayType={'text'} decimalScale={4} thousandSeparator={true} prefix={'$'} /></h2>
          </div>
          <div style={{
            alignSelf: 'flex-end',
            padding: '20px'
          }}>
            <h3> Falta { parseFloat(rate).toFixed(4) } %</h3>
          </div>
          <div className="wrapper">
            <div className='expected'></div>
            <div className="collected-bg"></div>
            <div className="collected"></div>
            <div className="wires"></div>
          </div>
          
        </header>
      </section>
        <section id="section02">
          <header className="App-header2">
            <img 
              src={Whiteline} 
              alt='whiteline' 
              style={{
                height: '100vh',
                alignSelf: 'center',
                position: 'absolute'
              }}
            />
            <h1 style={{
              position: 'absolute',
              color: '#ffcd6c',
              fontSize: '2em',
              textAlign: 'left',
              alignSelf: 'flex-start',
            }}>¿A dónde van esas donaciones?</h1>
              <div className="App-header2-col">
                <div className="App-header2-row">
                  <h2>COL 1 ROW 1</h2>
                </div>
                <div className="App-header2-row">
                  <h2>COL 1 ROW 2</h2>
                </div>
                <div className="App-header2-row">
                  <h2>COL 1 ROW 3</h2>
                </div>
              </div>
              <div className="App-header2-col">
                <div className="App-header2-row">
                  <h2>COL 2 ROW 1</h2>
                </div>
                <div className="App-header2-row">
                  <h2>COL 2 ROW 2</h2>
                </div>
                <div className="App-header2-row">
                  <h2>COL 2 ROW 3</h2>
                </div>
              </div>
          </header>
        </section>
        
        <section id="section03">
          <header className="App-header3">
            <Collected amount={localStorage.getItem('totalData')}/>
            <div style={{width: '85vh'}}>
              <Chart collected={collected} current={current}/>
            </div>
          </header>
        </section>
        <section id="section04">
          <header className="App-header4">
          <iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiNWI1ZTU2M2UtZmE3Yy00MmM2LThlNmQtMDZhNDczODA5MTYzIiwidCI6IjYxYmFkNGJiLWUwNTMtNDc1ZC04ZGI4LWQwMTZkYzk1NGVhNiIsImMiOjN9" frameborder="0" allowFullScreen="true"></iframe>
          </header>
        </section>
        <Notification addToCollected={this.addToCollected} />
      </div>
    );
  }
}

export default App;
