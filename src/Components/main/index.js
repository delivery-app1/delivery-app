import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home';
import Admin from '../admin';
import io from 'socket.io-client';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'https://b-delivery-app.herokuapp.com/';
const socket = io(SERVER_URL, { transports: ['websocket'] });
function Main(props) {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} socket={socket} />} />
      <Route path="/admin" render={(props) => <Admin {...props} socket={socket} />} />
      <Route>
        <div>404</div>
      </Route>
    </Switch>
  );
}

export default Main