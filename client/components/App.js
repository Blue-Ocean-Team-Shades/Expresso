import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'universe',
    };
  }

  render() {
    return <h1>Hello, {this.props.name} Universe</h1>;
  }
}

export default App;
