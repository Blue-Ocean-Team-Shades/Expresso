import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'universe',
    };
  }

  componentDidMount() {
    this.postBooks();
  }

  getBooks() {
    axios.get('/api/books').then((data) => console.log(data));
  }

  postBooks() {
    axios
      .post('/api/books', { name: 'mewtwo' })
      .then((data) => console.log(data));
  }

  render() {
    return <h1>Hello, {this.props.name} Universe</h1>;
  }
}

export default App;
