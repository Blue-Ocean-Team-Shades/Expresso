import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from './top-bar';
import ShopsList from './shops-list';
import axios from 'axios';

function App() {
  const [name, setName] = useState('universe');

  return (
    <div>
      <TopBar />
      Hello, {name} Universe!
      <ShopsList />
    </div>
  );
}

export default App;
