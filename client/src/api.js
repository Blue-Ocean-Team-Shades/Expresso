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
    updateCookies()
  })
}

function addDrink(drinkObj) {
  return axios.post('/drinkmenu', drinkObj)
}

export default { getShops, logIn, logOut, signUp, addDrink };
