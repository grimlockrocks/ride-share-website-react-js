import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap';
import { Table, Column, Cell } from 'fixed-data-table';
import { createContainer } from 'meteor/react-meteor-data';
import { CarpoolData } from '../api/carpool_data.js';

class CarpoolTable extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = { 
      showJoinConfirmation: false,
      selectedCarpool: null
    };
  }
              
  renderRows() {
    return this.props.carpools.map((carpool) => (
      <Carpool key={carpool.id} carpool={carpool} />
    ));
  }
  
  onClickJoin(carpool) {
    this.setState({ 
      showJoinConfirmation: true,
      selectedCarpool: carpool
    });
  }
  
  onCloseJoinConfirmationModal() {
    this.setState({ showJoinConfirmation: false });
  }
  
  onSubmitJoinConfirmationModal() {
    this.setState({ showJoinConfirmation: false });
    
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    
    CarpoolData.update(this.state.selectedCarpool._id, {
      $set: {capacity: String(parseInt(this.state.selectedCarpool.capacity) - 1)},
      $push: {riders: {"name": name, "email": email}}
    });
    
    Meteor.call("sendEmail",
                "<your_Email_sender>",
                this.state.selectedCarpool.email,
                email, 
                "Request to join your carpool",
                "Hi, I would like to join your carpool");

    this.props.onJoin();
  }
  
  render() {
    const TextCell = ({rowIndex, data, field, ...props}) => (
      <Cell {...props}>
        {data[rowIndex] ? data[rowIndex][field] : null}
      </Cell>
    );
    const ButtonCell = ({rowIndex, data, field, ...props}) => (
      <Cell {...props}>
        { parseInt(data[rowIndex].capacity) > 0 ? 
        <Button bsStyle="info" onClick={this.onClickJoin.bind(this, data[rowIndex])}>Join</Button>
        : null }
      </Cell>
    );
    return (
      <div>
        <Table 
          rowHeight={50}
          rowsCount={this.props.carpools.length}
          headerHeight={50}
          width={1138}
          maxHeight={600}
          {...this.props}>
          <Column
            header={<Cell>Name</Cell>}
            cell={<TextCell data={this.props.carpools} field="name" />}
            fixed={true}
            width={120}
          />
          <Column
            header={<Cell>Email</Cell>}
            cell={<TextCell data={this.props.carpools} field="email" />}
            fixed={true}
            width={200}
          />
          <Column
            header={<Cell>Seats Left</Cell>}
            cell={<TextCell data={this.props.carpools} field="capacity" />}
            fixed={true}
            width={90}
            align={"center"}
          />
          <Column
            header={<Cell>Destination</Cell>}
            cell={<TextCell data={this.props.carpools} field="destination" />}
            fixed={true}
            width={200}
          />
          <Column
            header={<Cell>Departure Time</Cell>}
            cell={<TextCell data={this.props.carpools} field="departure_time_pm" />}
            fixed={true}
            width={120}
            align={"center"}
          />
          <Column
            header={<Cell>Meetup Location & Instruction</Cell>}
            cell={<TextCell data={this.props.carpools} field="location" />}
            fixed={true}
            width={340}
          />
          <Column
            cell={<ButtonCell data={this.props.carpools} />}
            fixed={true}
            width={68}
            align={"center"}
          />
        </Table>
        <Modal show={this.state.showJoinConfirmation} onHide={this.onCloseJoinConfirmationModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.selectedCarpool === null ? "" : this.state.selectedCarpool.name}'s Carpool</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-style-5">
              <form>
                <label>Name: </label>
                <input type="text" ref="name" placeholder="Your Name *" />
                <label>Email: </label>
                <input type="email" ref="email" placeholder="Your Email *" />
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.onSubmitJoinConfirmationModal.bind(this)}>Join</Button>
            <Button onClick={this.onCloseJoinConfirmationModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CarpoolTable.propTypes = {
  carpools: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    carpools: CarpoolData.find({}, { sort: { createdAt: -1 }}).fetch(),
  };
}, CarpoolTable);