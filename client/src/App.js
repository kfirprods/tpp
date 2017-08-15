import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <form onSubmit={this._login.bind(this)}>
              <input type="text" />
              <input type="submit" value="Submit" />
          </form>
        </p>
      </div>
    );
  }

  _login(event) {
      event.preventDefault();

      axios.post('/login', {
          username: "Kfir Eichenblat",
          password: "123456"
      }).then(function (response) {
          console.log(response);
      }).catch(function (error) {
          console.log(error);
      });
  }
}

export default App;
