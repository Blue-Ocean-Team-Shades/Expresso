import Styled from './Styled.jsx';
import styled from 'styled-components'
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopsList from './shops-list';
import LoginSignup from './login-and-signup';
import ShopDetails from './shop-details';
import TopBar from './top-bar';
import { dummyShops } from '../dummyData.js';
import axios from 'axios';

const BodyMain = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
`

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
  const [message, setMessage] = useState('loading')

  useEffect(() => {
    setMessage('Fetching location')
    getLocation()
      .then((position) => {
        setMessage(null)
        setLocation(position);
        //TODO: enable the next line when server path is done
        //axios.get('/search', { body: { location: `${location.latitude} ${location.longitude}` } });
      })
      .catch(err => {
        setMessage('Please enable location, or enter a location in the search!')
      })
  }, []);

  return (
    <BrowserRouter style={{height: '100vh'}}>
      <BodyMain>
        <TopBar />
        <Routes>
          <Route path='/' element={<ShopsList shops={shops} setCurrentShop={setCurrentShop} message={message} />} />
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
      </BodyMain>
    </BrowserRouter>
  );
}

export default App;
