import axios from 'axios';

function getShops() {
  return true;
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

function addDrink(drinkObj) {
  return axios.post('/drinkmenu', drinkObj);
}

function likeDrink(drinkId) {
  const obj = {
    drink_id: drinkId,
    rating: '1',
  };
  return axios.post('/drinkrating', obj);
}

function dislikeDrink(drinkId) {
  const obj = {
    drink_id: drinkId,
    rating: '0',
  };
  return axios.post('/drinkrating', obj);
}

function getDrinks(place_id) {
  const optionsConfig = { data: { place_id } };
  return axios.get('/drinkmenu', optionsConfig);
}

export default { getShops, logIn, logOut, signUp, addDrink };
