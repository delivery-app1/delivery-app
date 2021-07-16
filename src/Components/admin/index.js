import axios from 'axios';
import React from 'react';
import Ticket from './ticket';
import FormModal from './modal';
import './admin.css';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';
const socket = io('localhost:5000/', { transports: ['websocket'] });
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffName: '',
      ordars: [],
      onlineStaff: [],
      showModal: false,
      done: 0,
      price: 0,
    };
  }
  componentDidMount() {
    // run once when component is mounted
    const staffName = prompt("WHAT's your name?");
    this.setState({ staffName });
    this.props.socket.on('connect', () => {
      //1a
      this.props.socket.emit('join', { name: staffName });
      this.props.socket.emit('getAll');
      this.props.socket.on('newTicket', (payload) => {
        console.log('payload',payload)
        this.setState({ ordars: payload });
      });
      this.props.socket.on('onlineStaff', (payload) => {
        this.setState({ onlineStaff: [...this.state.onlineStaff, payload] });
      });
      this.props.socket.on('offlineStaff', (payload) => {
        console.log('HELLO?', payload);
        this.setState({
          onlineStaff: this.state.onlineStaff.filter((staff) => staff.id !== payload.id),
        });
      });
    });
  }
  handleShowModal = () => {
    this.setState({
      showModal: true
    })
  }
  handleCloseModal = () => {
    this.setState({
      showModal: false,
    })
  }
  updateTime = (event) => {
    this.setState({
      done: event.target.value,
    })
  }
  updatePrice = (event) => {
    this.setState({
      price: event.target.value
    })
    console.log('price from modal');
  }
  answareOrder = async (event) => {
    event.preventDefault();
    const orderFormData = {
      done: this.state.done,
      price: this.state.price,
    }
    console.log(orderFormData)
  }
  handleClaim = (id, socketId) => {
    console.log(socketId);
    this.setState({
      showModal: true
    });
    console.log('ticket', this.state.staffName)
    this.props.socket.emit('claim', {
      id,
      name: this.state.staffName,
      customerId: socketId,
    });


    
  };
  deletee = async (id) => {
    socket.emit('delete',id);
 
  }
  render() {
    return (
      <main className="admin-container">
        <section id="container">
          <section id="tickets">
            {console.log('ordar', this.state.ordars)}
            {this.state.ordars.map((ordar) => {
              return (
                <>

                  <Ticket {...ordar} handleClaim={this.handleClaim} handleDelete={this.deletee} key={ordar._id} showModal={this.state.showModal} />
                  {this.state.showModal && <FormModal closeModalFx={this.handleCloseModal} showModal={this.state.showModal} updateTime={this.updateTime} updatePrice={this.updatePrice} answareOrder={this.answareOrder} done={this.done} price={this.price} />}
                </>
              );
            })}
          </section>
        </section>
        <aside id="online-staff">
          <h2>Staff</h2>
          {this.state.onlineStaff.map((staff) => (
            <div>
            <Spinner animation="grow" variant="success" />
            <span className="span" key={staff.id}>{staff.name}</span>
          </div>
          ))}
        </aside>
      </main>
    );
  }
}
export default Admin;