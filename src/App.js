import React, { Component } from 'react';
import AOS from 'aos';
import './App.css';
import {Transactions, Notification, Chart, Collected} from './components';
import pool1 from './pool-split_01.png';
import pool2 from './pool-split_02.png';
import Whiteline from './Whiteline.png';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collected: [{x: Date.now(), y: 0}],
    }
  }

  getData = () => {
    fetch('https://trax-teleton.herokuapp.com/api/collected', {
        method: 'get',
        mode: 'cors',
    }).then((response) => {
        return response.json();
    }).then((res) => {
        console.log(res)
        const collected = res[0].collected;
        const dataCollected = {x: Date.now(), y: collected};
        this.setState({
            collected: [this.state.collected[0], dataCollected]
        });
    }).catch((err) => {
        console.log(err);
    });
}

  componentWillMount() {
    AOS.init();
    this.getData();
  }

  addToCollected = (amount) => {
    const newTx = {x: Date.now(), y: amount};
    this.setState(prevState => ({
      collected: [...prevState.collected, newTx]
    }))
  }

  getLatestAmount = () => { 
    const {collected} = this.state;
    return collected[collected.length - 1].y;
  }


  render() {

    const {collected} = this.state;
    return (
      <div className="App">
        <section id="section01">
          <header className="App-header">
            <h1 style={{marginTop: '-15vh', color: 'purple'}}>Teleton</h1>
            <h2 style={{marginTop: '-30px'}}>Trax</h2>
              <div class="lds-circle" style={{zIndex: 10}}></div>
              <img src={pool1} style={{position: 'absolute', bottom: '195px', width:"100px"}} />
              <img src={pool2} style={{position: 'absolute',bottom: '7px', width:"100px", zIndex: 12}} />
          </header>
        </section>
        <section id="section02">
          <header className="App-header2">
            <div class="lds-circle" style={{zIndex: 10, marginTop: '-10vh'}}></div>
            <img src={Whiteline} style={{height: '100vh', position: 'relative', top: '0'}} />
          </header>
        </section>
        <section id="section03">
          <header className="App-header3">
            <Collected amount={this.getLatestAmount()}/>
            <Chart amount={this.getLatestAmount()} />
          </header>
        </section>
        <Notification addToCollected={this.addToCollected} />
      </div>
    );
  }
}

export default App;
