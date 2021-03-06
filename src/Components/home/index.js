import React from 'react';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';
import Button from 'react-bootstrap/Button';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'https://b-delivery-app.herokuapp.com/';
const socket = io(SERVER_URL, { transports: ['websocket'] });
// import Alert from "react-bootstrap/Alert";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: '',
      coffee: []
    };
  }
  componentDidMount() {
    const customerName = prompt("Enter your name:");
    this.setState({ customerName });
    this.props.socket.on('connect', () => {
      this.props.socket.on('claimed', function (payload) {
        alert(`${payload.name} Confirme your ordar \n Your order will be ready after: ${payload.done} minuts \n  price: ${payload.price} JD`);
      });
    });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChecked = (e) => {
    if(e.target.checked){
      this.setState({ 
        coffee: [...this.state.coffee, e.target.value]
       });
    } else if(!e.target.checked && this.state.coffee.includes(e.target.value)){
      this.setState({
        coffee: this.state.coffee.filter(element=>{
          return element !== e.target.value;
        })
      })
    }
  };



  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...this.state,
      created_at: Date.now(),
    };
    console.log('hello', payload);
   
    this.props.socket.emit('createTicket', payload);
  };
  render() {
    return (
      <>
      <h2>Welcome {this.state.customerName}</h2>
        <main className="container">
          <section className="form-card">

            <form className="orderform" onSubmit={this.handleSubmit}>
             <div id="order-form">
              <label className="coffeeMenu">Americano</label>
              <input
                type="checkbox"
                name="coffee"
              
                value="Amiricano"
                onChange={this.handleChecked}
              />

              <label className="coffeeMenu">Hot Coffee</label>
              <input
                type="checkbox"
                name="coffee"
                value="Hot Coffee"
                onChange={this.handleChecked}
              />
              <label className="coffeeMenu">Ice Coffee</label>
              <input
                type="checkbox"
                name="Ice Coffee"
                value="Ice Coffee"
                onChange={this.handleChecked}
              />
              <label className="coffeeMenu">Espresso</label>
              <input
                type="checkbox"
                name="Espresso"
                value="Espresso"
                onChange={this.handleChecked}
              />
              <label className="coffeeMenu">Mocha</label>
              <input
                type="checkbox"
                name="Mocha"
                value="Mocha"
                onChange={this.handleChecked}
              />
              <label className="coffeeMenu">Latte</label>
              <input 
                type="checkbox"
                name="Latte"
                value="Latte"
                onChange={this.handleChecked}
              />
              </div>
              <div className="size">
                <label className="size">Drink size:</label>
                <select name="size" id="size" onChange={this.handleChange}>
                  <option name="size" value="S">Small</option>
                  <option name="size" value="M">Medium</option>
                  <option name="size" value="L">Large</option>
                </select>
              </div>
              <br></br>

              <div className="branch">
              
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
                          
              </div>
              <div className="notes">
             
              <input
                id="notesInput"
                type="text"
                name="notes"
                placeholder="write your notes here..."
                required
                onChange={this.handleChange}
              />
                </div> 
              
              <br></br>
              <Button type="submit" className="submitOrder" style={{width:"100px"}} variant="light">Order</Button>
              {/* <button className="order">submit</button> */}
            </form>
          </section>
        </main>
        
      </>
    );
  }
}

export default Home;