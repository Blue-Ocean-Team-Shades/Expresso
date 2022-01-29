import Styled from './Styled.jsx';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopsList from './shops-list';
import LoginSignup from './login-and-signup';
import ShopDetails from './shop-details';
import TopBar from './top-bar'

function App() {
  //example persistent state
  const [entryTime, setEntryTime] = useState(new Date().toString());

  return (
    <BrowserRouter>
      Page loaded at: {entryTime}
      <TopBar />
      <Routes>
        <Route path='/' element={<ShopsList />} />
        <Route path='/details' element={<ShopDetails isFavorites={false} />} />
        <Route path='/login' element={<LoginSignup isLogin={true} />} />
        <Route path='/signup' element={<LoginSignup isSignup={true} />} />
        <Route path='/favorites' element={<ShopsList isFavorites={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
