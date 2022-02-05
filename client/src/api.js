import axios from 'axios';

function getShops(location) {
  const logDone = log('getShops');
  return axios
    .get('/findshops', {
      params: { location: `{lat:${location.latitude}, lng:${location.longitude}}` },
    })
    .then(logDone);
}

function getShopsAtLocation(location) {
  const logDone = log('getShops');
  return axios.get('/findshops', { params: { customLocation: location } }).then(logDone);
}

function logIn(formData, updateCookies) {
  const logDone = log('getShops');
  return axios
    .post('/login', formData)
    .then(() => {
      updateCookies();
    })
    .then(logDone);
}

function logOut(updateCookies) {
  const logDone = log('getShops');
  return axios
    .post('/logout')
    .then(() => {
      updateCookies();
    })
    .then(logDone);
}

function signUp(formData, updateCookies) {
  const logDone = log('getShops');
  return axios
    .post('/signup', formData)
    .then(() => {
      updateCookies();
    })
    .then(logDone);
}

function likeDrink(drink_id) {
  const logDone = log('getShops');
  const obj = {
    drink_id,
    rating: '1',
  };
  return axios.post('/ratedrink', obj).then(logDone);
}

function dislikeDrink(drink_id) {
  const logDone = log('getShops');
  const obj = {
    drink_id,
    rating: '0',
  };
  return axios.post('/ratedrink', obj).then(logDone);
}

function getDrinks(place_id) {
  const logDone = log('getShops');
  return axios
    .get('/getdrinkratings', { params: { place_id } })
    .then((response) => {
      return response;
    })
    .then(logDone);
}

function addDrink(drinkObj) {
  const logDone = log('getShops');
  return axios.post('/drinkmenu', drinkObj);
}

function getCookieData(sid) {
  const logDone = log('getShops');
  return axios
    .get(`/cookiedata`, { params: { sid: sid } })
    .then((response) => {
      return {
        user_id: response.data.user_id,
        username: response.data.username,
      };
    })
    .catch((err) => console.log(err));
}

function getImage(shopObj) {
  const logDone = log('getShops');
  return axios.get('/getshopimage', { params: { shopObj } }).then(logDone);
}

function likeShop(place_id, unlike) {
  const logDone = log('getShops');
  if (unlike) return axios.delete('/favorites', { params: { place_id } });
  return axios.post('/favorites', { place_id, rating: 1 }).then(logDone);
}

function getUserFavorites(user_id) {
  const logDone = log('getShops');
  return axios.get('/getuserfavorites', { params: { user_id } }).then(logDone);
}

function log(label) {
  const startTime = new Time();
  return function (data) {
    console.log(`${label}: ${startTime - new Time()}ms`);
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
