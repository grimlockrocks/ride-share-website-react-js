import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem, Alert } from 'react-bootstrap';
import CarpoolForm from './CarpoolForm.jsx';
import CarpoolTable from './CarpoolTable.jsx';

import styles1 from '../../client/bootstrap.css';
import styles2 from '../../client/fixed-data-table.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,  
      showTable: true,
      showMessage : false
    };
    this.onClickSubmitCarpool = this.onClickSubmitCarpool.bind(this);
    this.onClickJoinCarpool = this.onClickJoinCarpool.bind(this);
  }
   
  onClickHome() {
    location.reload();
  }
  
  onClickNewCarpool() {
    this.setState({
      showForm: true, 
      showTable: false,
      showMessage : false
    });  
  }
  
  onClickSubmitCarpool() {
    this.setState({
      showForm: false, 
      showTable: true
    });  
    this.displayAlert("");
  }
  
  onClickJoinCarpool() {
    this.displayAlert("");
  }
  
  displayAlert(message) {
    this.setState({
      showMessage : true
    }); 
    setTimeout(function() {
      this.setState({
        showMessage : false
      }); 
    }.bind(this), 5000);
  }
  
  render() {
    return (
      <div className="container">
        <br />
        { this.state.showMessage ?  
        <Alert bsStyle="success">
          Success!
        </Alert>
        : null }
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#" onClick={this.onClickHome.bind(this)}>Ride Share</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#" onClick={this.onClickNewCarpool.bind(this)}>Create</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">About&nbsp;&nbsp;&nbsp;</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      
        { this.state.showForm ? <CarpoolForm onSubmit={this.onClickSubmitCarpool} /> : null }
        
        { this.state.showTable ? <CarpoolTable onJoin={this.onClickJoinCarpool} /> : null }
      </div>
    );
  }

}