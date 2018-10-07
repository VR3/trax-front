import React, { Component } from 'react';
import AOS from 'aos';
import './App.css';
import {Notification, Chart} from './components';
import NumberFormat from 'react-number-format';
import { Line } from 'rc-progress';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collected: [{x: Date.now(), y: 0}],
      expected: null,
      current: null,
      rate: null,
      hourOptions: [],
      centers: null,
      hourOption: '',
      hourDonations: [],
    }
    this.groupBy = this.groupBy.bind(this);
    this.getDonationsByHour = this.getDonationsByHour.bind(this);
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
      this.setState({hourOptions: this.groupBy(res, 'hour')});
    });

    fetch('https://trax-teleton.herokuapp.com/api/centers', {
      method: 'get',
    })
    .then(res => res.json())
    .then((res) => {
      this.setState({centers: res});
    })
    .then(() => this.calculateCenters())
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
    const newObj = this.state.collected.slice()
    this.setState({
      collected: [newObj, newTx],
      current: this.state.current + amount,
    })
    this.calculateRate();
    this.calculateCenters();
  }

  getLatestAmount = () => { 
    const {collected} = this.state;
    return collected[collected.length - 1].y;
  }

  calculateCenters = () => {
    const { centers, current } = this.state;
    const centersCollected = [];
    
    centers.map(center => {
      const collected = center.proportion * current;
      const accomplished = collected / center.needed_event;
      center.collected = collected;
      center.accomplished = accomplished;
      centersCollected.push(center)
    })

    this.setState({centers: centersCollected})
  }

  getDonationsByHour(evt){
    const { hourOptions } = this.state;
    this.setState({hourOption: evt.target.value, hourDonations: hourOptions[evt.target.value]})
  }

  calculateRate = () => {
    const { expected, current } = this.state;
    const rate = (expected - current) / expected;
    this.setState({
      rate: rate * 100
    })
    const appRate = document.getElementById('root').style.setProperty('--growth', 1 - rate)
  }

  render() {
    const { collected, expected, current, rate, centers, hourOptions, hourDonations } = this.state;
    return (
      <div className="App">
      <section id="section01">
        <header className="App-header0-1">
          <img style={{ width: '150px'}} alt="trax" src="http://static.vr3.io//vr3/trax/traxLogo.png"></img>
          <img alt="trax" src="http://static.vr3.io//vr3/trax/traxType2x.png"></img>
        </header>
      </section>
      <section id="section01">
      <div className="lds-circle" style={{zIndex: 10}}></div>
        <header className="App-header1">
        <h1 data-aos="fade-right" style={{
          color: 'purple',
          fontSize: '1.5em',
          alignSelf: 'center'
        }}>¿Cómo beneficia mi donación?</h1>
          <div data-aos="fade-right" style={{
            padding: '40px',
            fontSize: '1.2em',
            color: '#92007b',
          }}>
            <h4>Nuestra meta este año</h4>
            <h1><NumberFormat value={expected} displayType={'text'} decimalScale={4} thousandSeparator={true} prefix={'$'} /></h1>
          </div>
          <div data-aos="fade-right" style={{
            color: '#ff6837',
          }}>
            <h4>Hemos logrado</h4>
            <h2><NumberFormat value={current} displayType={'text'} decimalScale={4} thousandSeparator={true} prefix={'$'} /></h2>
          </div>
          <div data-aos="fade-right" style={{
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
        <header className="App-header1-1">
          <h1 data-aos="fade-right" style={{
              color: '#ffcd6c',
              fontSize: '2em',
              textAlign: 'center',
              alignSelf: 'center',
            }}>¿A dónde van mis donaciones?</h1>
          </header>
          <header className="App-header2">
              <div className="App-header2-col">
                {centers ? centers.map(center => 
                  <div className="App-header2-row">
                    <h2>{center.center} - {parseFloat(center.accomplished * 100).toFixed(2)}%</h2>
                    <h4 style={{color: '#ffcd6c'}}>
                    Recaudado: <NumberFormat value={center.collected} displayType={'text'} decimalScale={4} thousandSeparator={true} prefix={'$'} /></h4>
                    <p>Requerido: <NumberFormat value={center.needed_event} displayType={'text'} decimalScale={4} thousandSeparator={true} prefix={'$'} /></p>
                    <small style={{color: 'gray', fontSize: '0.75em'}}>Requerido 2018 <NumberFormat value={center.needed} displayType={'text'} decimalScale={4} thousandSeparator={true} prefix={'$'} /></small>
                    <Line percent={center.accomplished <= 1 ? center.accomplished * 100 : 100} strokeWidth="6" strokeColor="#ff9022" />
                  </div>
                ) : null}
              </div>
          </header>
        </section>
        
        <section id="section03">
          <header className="App-header3">
            
            <div style={{width: '85vh'}}>
              <Chart collected={collected} current={current}/>
            </div>
          </header>
        </section>
        <section id="section04">
          <header className="App-header4">
          <div data-aos="fade-right">
            <h1 style={{
                color: 'purple',
                fontSize: '1.5em',
                textAlign: 'left',
                alignSelf: 'center'
              }}>Volumen de donaciones por estado</h1>
          </div>
          <iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiNWI1ZTU2M2UtZmE3Yy00MmM2LThlNmQtMDZhNDczODA5MTYzIiwidCI6IjYxYmFkNGJiLWUwNTMtNDc1ZC04ZGI4LWQwMTZkYzk1NGVhNiIsImMiOjN9" frameborder="0" allowFullScreen="true"></iframe>
          </header>
          <header className="App-header3">
          <div data-aos="fade-right">
            <h1 style={{
                color: 'purple',
                fontSize: '1.5em',
                textAlign: 'left',
                alignSelf: 'center'
              }}>Distribución de Ingresos por Demanda para enfermedades</h1>
          </div>
          <iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiNWUxM2FmNjMtMTFlNy00YjFkLTg1ZjgtYzZjMDY1M2Y5NGJlIiwidCI6IjYxYmFkNGJiLWUwNTMtNDc1ZC04ZGI4LWQwMTZkYzk1NGVhNiIsImMiOjN9" frameborder="0" allowFullScreen="true"></iframe>
          </header>
        </section>
        <section id="section04">
          <header className="App-header5">
            <h1 data-aos="fade-right" style={{
              color: '#ffcd6c',
              fontSize: '2em',
              textAlign: 'center',
              alignSelf: 'center',
            }}>Consulta las donaciones por hora</h1>
            <select style={{ backgroundColor: '#ffcb4e', color: 'purple', width: '400px', height: '200px', fontSize: '3em', alignItems:'center', justifyContent: 'center'}} onChange={this.getDonationsByHour}>
              {hourOptions ? (
                <React.Fragment>
                  <option value="2200">2200</option>
                  <option value="2355">2355</option>
                  <option value="2355">2400</option>
                </React.Fragment>
              ): null}
            </select>
            <div>
            {hourDonations ? hourDonations.map(hourDonation => 
              <div>
              <h5 style={{color: 'white', fontSize: '1em'}}>{`${(hourDonation.date)} - Hora: ${hourDonation.hour}`}</h5>
              <NumberFormat style={{color: 'white', fontSize: '1.5em'}}value={hourDonation.amount} displayType={'text'} decimalScale={4} thousandSeparator={true} prefix={'$'} />
              </div>
            ) : null}
            </div>
            </header>
          </section>

        <Notification addToCollected={this.addToCollected} />
      </div>
    );
  }
}

export default App;
