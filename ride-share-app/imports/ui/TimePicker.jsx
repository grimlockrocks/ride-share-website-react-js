import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class TimePicker extends Component {
  
  getSelectedTime() {
    const hour = ReactDOM.findDOMNode(this.refs.hour).value.trim(); 
    const minute = ReactDOM.findDOMNode(this.refs.minute).value.trim(); 
    const ampm = ReactDOM.findDOMNode(this.refs.ampm).value.trim(); 
    return hour + ":" + minute + " " + ampm;
  }
  
  render() {
    
    let hours = [];
    for (var i = 0; i <= 12; i++) {
      hours.push(<option value={i}>{i}</option>);
    }
    let minutes = [];
    minutes.push(<option value='00'>00</option>);
    minutes.push(<option value='05'>05</option>);
    for (var i = 10; i <= 59; i = i + 5) {
      minutes.push(<option value={i}>{i}</option>);
    }
                 
    return (
      <div id="timePicker">
        <select className="tpSelect" ref="hour">{hours}</select>
        &nbsp;&#58;&nbsp;
        <select className="tpSelect" ref="minute">{minutes}</select>
        &nbsp;&nbsp;
        <select className="tpSelect" ref="ampm">
          <option value="PM">PM</option>
          <option value="AM">AM</option>
        </select>
      </div>
    );
  }
}