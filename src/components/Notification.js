import React, { Component } from 'react';
import AOS from 'aos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import messages from '../dictionary/messages';
import socketIOClient from "socket.io-client";


export default class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            delta: null,
            data: [],
        }

    }

    componentWillMount() {
        AOS.init();
        //this.getData();
    }

    formatMoney = (n) => {
        return "$ " + (Math.round(n * 100) / 100).toLocaleString();
    }

    getMessage = (amount) => {
        const rand = Math.floor(Math.random() * 10) ;
        const currentMessage = messages[rand];
        return currentMessage.replace('$amount', this.formatMoney(amount));

    }

    componentDidMount() {

        const socketIO = socketIOClient.connect('wss://trax-teleton.herokuapp.com');
        
        socketIO.on("donations", data => {
            console.log('Donations', data);
            toast.info(this.getMessage(data.amount), {className: 'notification'});
            this.props.addToCollected(data.amount);
        });
    }
    
    render() {

        const {counter} = this.state;

        return (
        <div>
            <ToastContainer />
        </div>
        )
    }
}
