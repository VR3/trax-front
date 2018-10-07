import React, { Component } from 'react'

export default class Collected extends Component {

constructor(props) {
    super(props)
    this.state = {
        collected: null, 
    }
}

formatMoney = (n) => {
    return "$ " + (Math.round(n * 100) / 100).toLocaleString();
}

getData = () => {
    fetch('https://trax-teleton.herokuapp.com/api/collected', {
        method: 'get'
    }).then((response) => {
        return response.json();
    }).then((res) => {
        console.log(res)
        const collected = res[0].collected;
        this.setState({
            collected
        });
    }).catch((err) => {
        console.log(err);
    });
}

componentWillMount() {
    this.getData();
}

  render() {
      const {collected} = this.state;
    return (
      <div>
        <div data-aos="fade-right">
            <h1>Cifra recolectada</h1> 
            <h2>{this.formatMoney(collected)}</h2>
        </div>
      </div>
    )
  }
}
