import Styled from './Styled.jsx';
import styled from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopsList from './shops-list';
import LoginSignup from './login-and-signup';
import ShopDetails from './shop-details';
import TopBar from './top-bar';
import api from '../api.js';

const BodyMain = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
`;

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
  const [shops, setShops] = useState([]);
  const [currentShop, setCurrentShop] = useState(null);
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState('loading');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    updateCookies();
  }, [document.cookie]);

  useEffect(() => {
    setMessage('Fetching location');
    getLocation()
      .then((position) => {
        setMessage(null);
        setLocation(position);
        return api.getShops(position);
      })
      .then(({ data }) => {
        setShops(data);
        console.log(data);
      })
      .catch((err) => {
        //TODO: catch separate error for location services earlier
        console.error(err);
        setMessage('Please enable location, or enter a location in the search!');
      });
  }, []);

  function isLoggedIn() {
    return cookies.username;
  }

  function submitSearch() {
    if (location) {
      if (searchLocation) {
        api.getShopsAtLocation(searchLocation)
          .then(({data}) => setShops(data))
          .catch((err) => console.error(err))

      } else {
        api.getShops(location)
        .then(({data}) => setShops(data))
        .catch((err) => console.error(err))
      }
      //TODO: submit search at location
      //TODO: reroute to shops list
    }
  }

  function updateCookies() {
    const newCookies = {};
    document.cookie.split(';').forEach((cookie) => {
      let [cookieName, cookieBody] = cookie.split('=').map(item => item.trim());
      if (cookieName === 'expressoid') {
        const slicedBody = cookieBody.slice(4).split('.');
        api
          .getCookieData(slicedBody[0])
          .then((response) => {
            newCookies.user_id = response.user_id;
            newCookies.username = response.username;
            setCookies(newCookies);
          })
          .catch((err) => console.log(err));
      }
      newCookies[cookieName] = cookieBody;
    });
    setCookies(newCookies);
  }

  return (
    <BrowserRouter style={{ height: '100vh' }}>
      <BodyMain>
        <TopBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          submitSearch={submitSearch}
          cookies={cookies}
          updateCookies={updateCookies}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route
            path='/'
            element={
              <ShopsList
                shops={shops}
                setCurrentShop={setCurrentShop}
                message={message}
                searchTerm={searchTerm}
                cookies={cookies}
              />
            }
          />
          <Route
            path='/details'
            element={
              <ShopDetails
                shops={shops}
                setCurrentShop={setCurrentShop}
                currentShop={currentShop}
                shops={shops}
                setShops={setShops}
              />
            }
          />
          {/* TODO: if already signed in, redirect back to home */}
          <Route
            path='/login'
            element={<LoginSignup isLogin={true} cookies={cookies} updateCookies={updateCookies} />}
          />
          <Route
            path='/signup'
            element={
              <LoginSignup isSignup={true} cookies={cookies} updateCookies={updateCookies} />
            }
          />
          <Route
            path='/favorites'
            element={
              <ShopsList
                isFavorites={true}
                shops={shops}
                setCurrentShop={setCurrentShop}
                message={message}
                searchTerm={searchTerm}
                cookies={cookies}
              />
            }
          />
        </Routes>
      </BodyMain>
    </BrowserRouter>
  );
}

export default App;
