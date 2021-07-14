import React from 'react';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL || 'localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: '',
      coffee: []
    };
  }
  componentDidMount() {
    const customerName = prompt("WHAT's your name?");
    this.setState({ customerName });
    this.props.socket.on('connect', () => {
      this.props.socket.on('claimed', function (payload) {
        alert(`${payload.name} claimed your ordar`);
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
        <main className="container">
          <section className="form-card">

            <form id="order-form" onSubmit={this.handleSubmit}>
              <p>Coffee Mnue</p>
              <br></br>
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

              <br></br>
              <label className="size">Americano</label>
              <input
                type="checkbox"
                name="coffee"
              
                value="Amiricano"
                onChange={this.handleChecked}
              />

              <label className="size">Hot Coffee</label>
              <input
                type="checkbox"
                name="coffee"
                value="Hot Coffee"
                onChange={this.handleChecked}
              />
              <label className="size">Ice Coffee</label>
              <input
                type="checkbox"
                name="Ice Coffee"
                value="Ice Coffee"
                onChange={this.handleChecked}
              />
              <label className="size">Espresso</label>
              <input
                type="checkbox"
                name="Espresso"
                value="Espresso"
                onChange={this.handleChecked}
              />
              <label className="size">Mocha</label>
              <input
                type="checkbox"
                name="Mocha"
                value="Mocha"
                onChange={this.handleChecked}
              />
              <label className="size">Latte</label>
              <input
                type="checkbox"
                name="Latte"
                value="Latte"
                onChange={this.handleChecked}
              />
              <div className="size">
                <label className="size">Drink size:</label>
                <select name="size" id="size" onChange={this.handleChange}>
                  <option name="size" value="S">Small</option>
                  <option name="size" value="M">Medium</option>
                  <option name="size" value="L">Large</option>
                </select>
              </div>
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
        
      </>
    );
  }
}

export default Home;