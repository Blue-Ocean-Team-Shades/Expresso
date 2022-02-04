import Styled, {isMobile} from './Styled.jsx';
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
  const [favoriteShops, setFavoriteShops] = useState({});
  const [favoriteDrinks, setFavoriteDrinks] = useState({});
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile())
    window.addEventListener('resize', () => {
      setMobile(isMobile())
    })
  }, [])

  useEffect(() => {
    const newCookies = updateCookies()
    if (cookies.length === 0) {
      if (newCookies.location) {
        const position = JSON.parse(newCookies.location)
        setMessage(null);
        setLocation(position)
        api.getShops(position)
          .then(({data}) => setShops(data))
          .catch(err => {
            console.error(err)
            setMessage('Unable to get shops at location')
          })
      } else {
        setMessage('Fetching location');
        getLocation()
          .then((position) => {
            setMessage(null);
            setLocation(position);
            const positionOb = {latitude: position.latitude, longitude: position.longitude}
            document.cookie = `location=${JSON.stringify(positionOb)}; path=/`;
            return api.getShops(position);
          })
          .then(({ data }) => {
            setShops(data);
          })
          .catch((err) => {
            //TODO: catch separate error for location services earlier
            console.error(err);
            setMessage('Please enable location, or enter a location in the search!');
          });
      }
    }
  }, [document.cookie]);

  function isLoggedIn() {
    return cookies.username;
  }

  function submitSearch() {
    if (location) {
      if (searchLocation) {
        api
          .getShopsAtLocation(searchLocation)
          .then(({ data }) => setShops(data))
          .catch((err) => console.error(err));
      } else {
        api
          .getShops(location)
          .then(({ data }) => setShops(data))
          .catch((err) => console.error(err));
      }
      //TODO: reroute to shops list
    }
  }

  function updateCookies() {
    const newCookies = {};
    document.cookie.split(';').forEach((cookie) => {
      let [cookieName, cookieBody] = cookie.split('=').map((item) => item.trim());
      newCookies[cookieName] = cookieBody;
    });
    if (newCookies.expressoid) {
      if (cookies.expressoid) {
        //if session already exists in state, no need to get username; just copy them over
        newCookies.user_id = cookies.user_id;
        newCookies.username = cookies.username;
      } else {
        const session = newCookies.expressoid.slice(4).split('.');
        api
          .getCookieData(session[0])
          .then((response) => {
            setCookies((oldCookies) => {
              oldCookies.user_id = response.user_id;
              oldCookies.username = response.username;
              setCookies(oldCookies);
            });
            return api.getUserFavorites(response.user_id);
          })
          .then(({data}) => {
            const newFavoriteShops = {};
            for (const shop of data.favoriteShops) {
              newFavoriteShops[shop.place_id] = true;
            }
            setFavoriteShops(newFavoriteShops);
            const newFavoriteDrinks = {}
            for (const drink of data.favoriteDrinks) {
              if (!newFavoriteDrinks[drink.place_id]) newFavoriteDrinks[drink.place_id] = {};
              newFavoriteDrinks[drink.place_id][drink.drink_id] = true;
            }
            setFavoriteDrinks(newFavoriteDrinks);
          })
          .catch((err) => console.log(err));
      }
    }
    setCookies(newCookies);
    return newCookies
  }

  return (
    <BrowserRouter>
      <div style={{ height: '100vh', width:'100vw', maxHeight: '100vh', display: 'flex' }}>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
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
          <div style={{flex: 1, overflow:'auto'}}>
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
                    isLoggedIn={isLoggedIn}
                    favoriteShops={favoriteShops}
                    setFavoriteShops={setFavoriteShops}
                    mobile={mobile}
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
                    cookies={cookies}
                    isLoggedIn={isLoggedIn}
                    favoriteShops={favoriteShops}
                    setFavoriteShops={setFavoriteShops}
                  />
                }
              />
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
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
