import React from 'react';
import Ticket from './ticket';
import FormModal from './modal';
import './admin.css';
import io from 'socket.io-client';
const socket = io('localhost:5000/', { transports: ['websocket'] });
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffName: '',
      tickets: [],
      onlineStaff: [],
      showModal:false,
      done:0,
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
        this.setState({ tickets: [...this.state.tickets, payload] });
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
  handleShowModal=()=> {
    this.setState({
      showModal:true
    })
  }
  handleCloseModal=()=> {
    this.setState({
      showModal:false,
    })
  }
  updateTime=(event)=>{
    this.setState({
      done: event.target.value,
    })
  }
  updatePrice=(event)=>{
    this.setState({
      price: event.target.value
    })
    console.log('price from modal');
  }
  answareOrder = async (event) =>{
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
    console.log('ticket',this.state.staffName)
    this.props.socket.emit('claim', {
      id,
      name: this.state.staffName,
      studentId: socketId,
    });
    
  };
  render() {
    return (
      <main className="admin-container">
      <section id="container">
        <h2>Opened Tickets</h2>
        <section id="tickets">
          {this.state.tickets.map((ticket) => {
            return (
  <>
              <Ticket {...ticket} handleClaim={this.handleClaim} key={ticket.id} showModal={this.state.showModal} />
              {this.state.showModal &&  <FormModal  closeModalFx={this.handleCloseModal} showModal={this.state.showModal} updateTime={this.updateTime} updatePrice={this.updatePrice} answareOrder={this.answareOrder} done={this.done} price={this.price}/>}
              </>
            );
          })}
        </section>
      </section>
      <aside id="online-staff">
        <h2>Available TAs</h2>
        {this.state.onlineStaff.map((staff) => (
          <h2 key={staff.id}>{staff.name}</h2>
        ))}
      </aside>
    </main>
    );
  }
}
export default Admin;