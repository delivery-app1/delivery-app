import React from 'react';
import './home.css';
import {Form,Button} from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL || 'localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: '',
    };
  }
  componentDidMount() {
    const studentName = prompt("WHAT's your name?");
    this.setState({ studentName });
    this.props.socket.on('connect', () => {
      this.props.socket.on('claimed', function (payload) {
        alert(`${payload.name} claimed your ticket`);
      });
    });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...this.state,
      created_at: Date.now(),
    };
    console.log('hello', payload);
    // once the user submit the form we need to emit a ticket so all TAs can see that ticket

    // 1
    this.props.socket.emit('createTicket', payload);
  };
  render() {
    return (
        <>
      <main className="container">
         <section className="form-card">
     
           <form id="order-form" onSubmit={this.handleSubmit}>
           <label >Notes</label>
             <input
               className="notes"
               type="text"
               name="notes"
               placeholder="write your notes here..."
               required
               onChange={this.handleChange}
             />
            <br></br>
             <label  >Coffee Menu</label>
             <select name="coffee" id="coffee" onChange={this.handleChange}>
               <option name="coffee" value="Americano">Americano</option>
               <option name="coffee" value="Hot Coffee">Hot Coffee</option>
               <option name="coffee" value="Ice Coffee">Ice Coffee</option>
               <option name="coffee" value="Espresso">Espresso</option>
               <option name="coffee" value="Mocha">Mocha</option>
               <option name="coffee" value="Latte">Latte</option>
             </select>
             <label className="size">Drink size:</label>
             <select name="size" id="size" onChange={this.handleChange}>
               <option name="size" value="S">Smail</option>
               <option name="size" value="M">Medium</option>
               <option name="size" value="L">Large</option>
             </select>
             <label className="branch">
               <input
                 type="radio"
                 name="branch"
                 value="Amman-Rainbow.St"
                 required
                 onChange={this.handleChange}
               />
               Amman-Rainbow.St
             </label>
             <label className="branch">
               <input
                 type="radio"
                 name="branch"
                 value="Amman Maka-Mall"
                 onChange={this.handleChange}
               />
               Amman Mecca-Mall
             </label>
             <label className="branch">
               <input
                 type="radio"
                 name="branch"
                 value="Irbid City-Center"
                 onChange={this.handleChange}
               />
               Irbid City-Center
             </label>
             <button className="order">submit</button>
           </form> 
             </section>
             </main>
    {/*  <Form onSubmit={this.handleSubmit}>
      <Form.Group className="mb-3" >
          <Form.Label>Notes</Form.Label>
          <Form.Control className="notes" type="text" placeholder="write your notes here..." onChange={this.handleChange} />
        </Form.Group>
         <Form.Select name="coffee" id="coffee" onChange={this.handleChange}>
          <option>Open this select menu</option>
          <option name="coffee" value="Americano">Americano</option>
          <option name="coffee" value="Hot Coffee">Hot Coffee</option>
          <option name="coffee" value="Ice Coffee">Ice Coffee</option>
          <option name="coffee" value="Espresso">Espresso</option>
          <option name="coffee" value="Mocha">Mocha</option>
          <option name="coffee" value="Latte">Latte</option>
        </Form.Select>

        <Form.Select name="size"  onChange={this.handleChange}>
        <option name="size" value="S">Smail</option>
        <option name="size" value="M">Medium</option>
               <option name="size" value="L">Large</option>
               </Form.Select>
               
               <Form.Group className="coffee" controlId="formBasicPassword">
               <Form.Label>Coffee Menu</Form.Label>
          <Form.Control type="radio"
          name="branch"
                 value="Amman-Rainbow.St"
                 required
                 onChange={this.handleChange} />
                 <Form.Control type="radio"
                 type="radio"
                 name="branch"
                 value="Amman Maka-Mall"
                 onChange={this.handleChange}/>
                 </Form.Group>
                
        <Button variant="primary" type="submit">
          Submit
        </Button>
    </Form>*/}
                </>
    );
  }
}

export default Home;