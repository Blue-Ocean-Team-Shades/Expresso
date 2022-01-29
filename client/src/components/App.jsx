import Styled from './Styled.jsx';
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopsList from './shops-list';
import LoginSignup from './login-and-signup';
import ShopDetails from './shop-details';
import TopBar from './top-bar';
import { dummyShops } from '../dummyData.js';

function App() {
  //example persistent state
  const [entryTime, setEntryTime] = useState(new Date().toString());
  const [shops, setShops] = useState(dummyShops);
  const [currentShop, setCurrentShop] = useState(null);

  return (
    <BrowserRouter>
      Page loaded at: {entryTime}
      <TopBar />
      <Routes>
        <Route path='/' element={<ShopsList shops={shops} setCurrentShop={setCurrentShop} />} />
        <Route
          path='/details'
          element={
            <ShopDetails shops={shops} setCurrentShop={setCurrentShop} currentShop={currentShop} />
          }
        />
        <Route path='/login' element={<LoginSignup isLogin={true} />} />
        <Route path='/signup' element={<LoginSignup isSignup={true} />} />
        <Route
          path='/favorites'
          element={<ShopsList isFavorites={true} shops={shops} setCurrentShop={setCurrentShop} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
