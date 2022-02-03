import axios from 'axios';

function getShops(location) {
  return axios.post('/findshops', {location: `{lat:${location.latitude}, lng:${location.longitude}}`});
}

function getShopsAtLocation(location) {
  return axios.post('/findshops', {customLocation: location});
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
  return axios.post('/getdrinkratings', { place_id }).then((response) => {
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
  return axios.post('/getshopimage', shopObj);
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
};
