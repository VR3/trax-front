import React, { Component } from 'react';
import AOS from 'aos';
import './App.css';
import {Transactions, Notification, Chart, Collected} from './components';
import NumberFormat from 'react-number-format';
import Whiteline from './Whiteline.png';
import styled from 'styled-components';


class App extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      collected: [{x: Date.now(), y: 0}],
      expected: null,
      current: null,
      rate: null,
    }
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
  }

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
    const { collected, expected, current, rate } = this.state;
    console.log('State:', this.state);
    return (
      <div className="App">
        <section id="section01">
          <header className="App-header">
            <h1 style={{marginTop: '-15vh', color: 'purple'}}>Teleton</h1>
            <h2 style={{marginTop: '-30px'}}>Trax</h2>
              <div className="lds-circle" style={{zIndex: 10}}></div>

              <p>Meta</p>
              <h1 style={{color: '#92007b'}}><NumberFormat value={expected} displayType={'text'} decimalScale={4} thousandSeparator={true} prefix={'$'} /></h1>
              <p>Recaudado</p>
              <h3><NumberFormat value={current} displayType={'text'} decimalScale={4} thousandSeparator={true} prefix={'$'} /></h3>
              <p>Falta</p>
              <h3>{ parseFloat(rate).toFixed(4) } %</h3>

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
            <div class="lds-circle" style={{zIndex: 1, position: 'absolute', top: '0', marginTop: '-10vh'}}></div>
            <img src={Whiteline} style={{height: '100vh'}} />
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
