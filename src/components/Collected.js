import React, { Component } from 'react'

export default class Collected extends Component {

formatMoney = (n) => {
    return "$ " + (Math.round(n * 100) / 100).toLocaleString();
}

  render() {
    const {amount} = this.props;
    return (
      <div>
        <div data-aos="fade-right">
            <h1 style={{color: 'purple'}}>Cifra recolectada</h1> 
            <h2 style={{color: 'purple'}}>{this.formatMoney(amount)}</h2>
        </div>
      </div>
    )
  }
}
