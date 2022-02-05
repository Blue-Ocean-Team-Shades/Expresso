import axios from 'axios';

function getShops(location) {
  return axios.get('/findshops', {params: {location: `{lat:${location.latitude}, lng:${location.longitude}}`}});
}

function getShopsAtLocation(location) {
  return axios.get('/findshops', {params : {customLocation: location}});
}

function logIn(formData, updateCookies) {
  return axios.post('/login', formData).then(() => {
    updateCookies();
  });
}

function logOut(updateCookies) {
  return axios.post('/logout').then(() => {
    updateCookies();
  });
}

function signUp(formData, updateCookies) {
  return axios.post('/signup', formData).then(() => {
    updateCookies();
  });
}

function likeDrink(drink_id) {
  const obj = {
    drink_id,
    rating: '1',
  };
  return axios.post('/ratedrink', obj);
}

function dislikeDrink(drink_id) {
  const obj = {
    drink_id,
    rating: '0',
  };
  return axios.post('/ratedrink', obj);
}

function getDrinks(place_id) {
  return axios.get('/getdrinkratings', { params: { place_id } }).then((response) => {
    return response;
  });
}

function addDrink(drinkObj) {
  return axios.post('/drinkmenu', drinkObj);
}

function getCookieData(sid) {
  return axios.get(`/cookiedata`, {params: {sid: sid}})
    .then(response => {
      return {
        user_id: response.data.user_id,
        username: response.data.username
      };
    })
    .catch(err => console.log(err));
}

function getImage(shopObj) {
  return axios.get('/getshopimage', {params: {shopObj} });
}

function likeShop(place_id, user_id) {
  return axios.post('/favorites', {place_id, rating: 1})
}

function getUserFavorites(user_id) {
  return axios.get('/getuserfavorites', {params: {user_id}})
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
