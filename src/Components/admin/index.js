import axios from 'axios';
import React from 'react';
import Ticket from './ticket';
import FormModal from './modal';
import './admin.css';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'https://b-delivery-app.herokuapp.com/';
const socket = io(SERVER_URL, { transports: ['websocket'] });
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
      socketId:0,
      id:0,
    };
  }
  componentDidMount() {
    // run once when component is mounted
    const staffName = prompt("Employee name:");
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
        console.log('pay load from onlinstaff', payload);
        this.setState({
          onlineStaff: this.state.onlineStaff.filter((staff) => staff.id !== payload.id),
        });
      });
    });
  }
  handleShowModal = (id, socketId) => {
    this.setState({
      showModal: true,
      id:id,
      socketId: socketId,

    })
    // console.log('from handle showmodel',id,socketId)
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
    // console.log('price from modal',event.target.value);
  }
  // answareOrder = async (event) => {
  //   event.preventDefault();
  //   const orderFormData = {
  //     done: this.state.done,
  //     price: this.state.price,
  //   }
  //   console.log(orderFormData)
  // }
answareOrder = async (event) => {
      event.preventDefault();
  this.props.socket.emit('claim', {
       id:this.state.id,
        name: this.state.staffName,
        customerId:this.state.socketId,
        done: this.state.done,
        price: this.state.price,
      });  
  };



  // handleClaim = (id, socketId) => {
  //   console.log(socketId);
    // this.setState({
    //   showModal: true
    // });
   // the previos
  //   console.log('ticket', this.state.staffName)
  //   this.props.socket.emit('claim', {
  //     id,
  //     name: this.state.staffName,
  //     customerId: socketId,
  //   });  
  // };


  
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
                  <Ticket {...ordar} handleDelete={this.deletee} key={ordar._id}  handleShowModal={this.handleShowModal}  />
                  {this.state.showModal && <FormModal   closeModalFx={this.handleCloseModal} showModal={this.state.showModal} updateTime={this.updateTime} updatePrice={this.updatePrice} answareOrder={this.answareOrder} done={this.done} price={this.price} handleClaim={this.handleClaim} />}
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