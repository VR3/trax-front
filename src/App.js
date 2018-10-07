import React, { Component } from 'react';
import AOS from 'aos';
import './App.css';
import {Transactions, Notification, Chart, Collected} from './components';
import { Grid, Row, Col } from 'react-flexbox-grid';
import pool1 from './pool-split_01.png';
import pool2 from './pool-split_02.png';
import Whiteline from './Whiteline.png';

class App extends Component {

  componentWillMount() {
    AOS.init();
  }

  render() {
    return (
      <div className="App">
        <section id="section01">
          <header className="App-header">
            <h1 style={{marginTop: '-15vh', color: 'purple'}}>Teleton</h1>
            <h2 style={{marginTop: '-30px'}}>Trax</h2>
              <div className="lds-circle" style={{zIndex: 10}}></div>
              <div className="wrapper">
                <div className="expected"></div>
                <div className="collected-bg"></div>
                <div className="collected"></div>
                <div className="wires"></div>
              </div>
          </header>
        </section>
        <section id="section02">
          <header className="App-header2">
            <div className="lds-circle" style={{zIndex: 1, position: 'absolute', top: '0', marginTop: '-10vh'}}></div>
            <img src={Whiteline} style={{height: '100vh'}} />
          </header>
        </section>
        <section id="section03">
          <header className="App-header3">
            <Collected />
          </header>
        </section>
        <Notification />
      </div>
    );
  }
}

export default App;
