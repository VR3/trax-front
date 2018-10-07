import React, { Component } from 'react';
import AOS from 'aos';
import './App.css';
import {Transactions} from './components';

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
              <div class="lds-circle"></div>
          </header>
        </section>
        <section id="section02">
          <header className="App-header">
            <div data-aos="fade-up"
                data-aos-anchor-placement="top-bottom">
                <Transactions />
            </div>
          </header>
        </section>
      </div>
    );
  }
}

export default App;
