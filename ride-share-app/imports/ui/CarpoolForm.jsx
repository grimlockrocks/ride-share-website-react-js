import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { CarpoolData } from '../api/carpool_data.js';
import TimePicker from './TimePicker.jsx';

export default class CarpoolForm extends Component {
  
  componentDidMount() {

  }
    
  handleSubmit(event) {
    event.preventDefault();
    
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const capacity = ReactDOM.findDOMNode(this.refs.capacity).value.trim();
    const destination = ReactDOM.findDOMNode(this.refs.destination).value.trim();
    const departure_time_pm = this.refs.departure_time_pm.getSelectedTime();
    const location = ReactDOM.findDOMNode(this.refs.location).value.trim();
    const comment = ReactDOM.findDOMNode(this.refs.comment).value.trim();
    
    CarpoolData.insert({
      name,
      email,
      capacity,
      destination, 
      departure_time_pm,
      location,
      comment,
      createdAt: new Date()
    });
 
    this.props.onSubmit();
  }
  
  render() {
    
    let capacity_options = [];
    for (var i = 1; i <= 6; i++) {
      capacity_options.push(<option value={i}>{i}</option>);
    }
    
    return (
      <div className="form-style-5">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <legend><span className="number">1</span> Driver</legend>
          <label>Name: </label>
          <input type="text" ref="name" placeholder="Your Name *" />
          <label>Email: </label>
          <input type="email" ref="email" placeholder="Your Email *" />
          
          <legend><span className="number">2</span> Vehicle</legend>
          <label htmlFor="capacity">Available Seats: </label>
          <select id="capacity" ref="capacity">
            {capacity_options}
          </select>      
      
          <legend><span className="number">3</span> Schedule</legend>
          <label>Destination: </label>
          <input type="text" ref="destination" placeholder="Which Direction *" />
          <label>Leaving Time: </label>
          <TimePicker ref="departure_time_pm"/>
          <label>Meetup Location: </label>
          <input type="text" ref="location" placeholder="Where to Meet *" />
          <label>Comments: </label>
          <textarea ref="comment" placeholder="Comments"></textarea>
        
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}