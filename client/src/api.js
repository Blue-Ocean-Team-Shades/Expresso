import axios from 'axios';

const silent = false; //set to true to turn off API call logging

function getShops(location) {
  const logDone = log('getShops');
  return axios
    .get('/findshops', {
      params: { location: `{lat:${location.latitude}, lng:${location.longitude}}` },
    })
    .then(logDone);
}

function getShopsAtLocation(location) {
  const logDone = log('getShopsAtLocation');
  return axios.get('/findshops', { params: { customLocation: location } }).then(logDone);
}

function logIn(formData, updateCookies) {
  const logDone = log('logIn');
  return axios
    .post('/login', formData)
    .then(() => {
      updateCookies();
    })
    .then(logDone);
}

function logOut(updateCookies) {
  const logDone = log('logOut');
  return axios
    .post('/logout')
    .then(() => {
      updateCookies();
    })
    .then(logDone);
}

function signUp(formData, updateCookies) {
  const logDone = log('signUp');
  return axios
    .post('/signup', formData)
    .then(() => {
      updateCookies();
    })
    .then(logDone);
}

function likeDrink(drink_id) {
  const logDone = log('likeDrink');
  const obj = {
    drink_id,
    rating: '1',
  };
  return axios.post('/ratedrink', obj).then(logDone);
}

function dislikeDrink(drink_id) {
  const logDone = log('dislikeDrink');
  const obj = {
    drink_id,
    rating: '0',
  };
  return axios.post('/ratedrink', obj).then(logDone);
}

function getDrinks(place_id) {
  const logDone = log('getDrinks');
  return axios
    .get('/getdrinkratings', { params: { place_id } })
    .then((response) => {
      return response;
    })
    .then(logDone);
}

function addDrink(drinkObj) {
  const logDone = log('addDrink');
  return axios.post('/drinkmenu', drinkObj);
}

function getCookieData(sid) {
  const logDone = log('getCookieData');
  return axios
    .get(`/cookiedata`, { params: { sid: sid } })
    .then((response) => {
      return {
        user_id: response.data.user_id,
        username: response.data.username,
      };
    })
    .catch((err) => console.log(err))
    .then(logDone);
}

function getImage(shopObj) {
  const logDone = log('getImage');
  return axios.get('/getshopimage', { params: { shopObj } }).then(logDone);
}

function likeShop(place_id, unlike) {
  const logDone = log('likeShop');
  if (unlike) return axios.delete('/favorites', { params: { place_id } });
  return axios.post('/favorites', { place_id, rating: 1 }).then(logDone);
}

function getUserFavorites(user_id) {
  const logDone = log('getUserFavorites');
  return axios.get('/getuserfavorites', { params: { user_id } }).then(logDone);
}

let callsCounter = 0;

function log(label, silentStart) {
  if (!silent) {
    const startTime = new Date();
    const count = callsCounter++;
    if (!silentStart) {
      console.log(`| ${count} ${label} -->`);
    }
    return function (data) {
      console.log(`<-- ${count} ${label} | ${new Date() - startTime}ms`);
      return data;
    };
  }
  return function (data) {
    return data;
  };
}

export default {
  getShops,
  logIn,
  logOut,
  signUp,
  addDrink,
  likeDrink,
  dislikeDrink,
  getDrinks,
  getShopsAtLocation,
  getImage,
  getCookieData,
  likeShop,
  getUserFavorites,
};
