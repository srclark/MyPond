import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {animals: []}

  componentDidMount() {
    fetch('/animals')
    .then(res => res.json())
    .then(animals => this.setState({ animals }));
  }

  render() {

      return (
        <div className="App">
          <h1>Animals</h1>
          <ul className="animal-attributes">
          {this.state.animals.map(animals =>
            <li key={animals.id}>
                  <img src={animals.picture_url} />
                  <div className="animal-details">
                    <h3 className="animal-name">{animals.name}</h3>
                    <p className="animal-type">{animals.animal_type}</p>
                    <p className='animal-desc'>{animals.animal_desc}</p>
                  </div>
            </li>
          )}
          </ul>
        </div>
      );
    }
}

export default App;
