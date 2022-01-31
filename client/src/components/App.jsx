import Styled from './Styled.jsx';
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopsList from './shops-list';
import LoginSignup from './login-and-signup';
import ShopDetails from './shop-details';
import TopBar from './top-bar';
import { dummyShops } from '../dummyData.js';
import axios from 'axios';

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position, err) => {
        if (err) {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              console.error('location permissions denied');
              break;
            case err.POSITION_UNAVAILABLE:
              console.error('position unavailable');
              break;
            case err.TIMEOUT:
              console.error('location response timed out');
              break;
            case err.UNKNOWN_ERROR:
              console.error('unknow location error');
              break;
          }
          reject(null);
        }
        resolve(position.coords);
      });
    } else {
      reject(null);
    }
  });
}

function App() {
  const [shops, setShops] = useState(dummyShops);
  const [currentShop, setCurrentShop] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocation().then((position) => {
      setLocation(position);
      //TODO: enable this when server path is done
      //axios.get('/search', { body: { location: `${location.latitude} ${location.longitude}` } });
    });
  }, []);

  return (
    <BrowserRouter>
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
