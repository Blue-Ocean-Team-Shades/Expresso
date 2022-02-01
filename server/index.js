const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');
const { pool } = require('../database');

const { login, signup } = require('./controllers/userAccounts');
const {
  addDrink,
  rateDrink,
  getDrinkRatings,
  getShopsDrinks,
} = require('./controllers/drinkMenu');
const { addShopRating, getShopRatings } = require('./controllers/shopRatings');
const {
  addUserFavorite,
  getUserFavorites,
} = require('./controllers/userFavorites');

app.use(express.json());
app.use(express.urlencoded());

//janky fix, but it's fine because we're replacing all this with subdomains anyways
const staticPath = '../client/dist';
app.use('/', express.static(path.resolve(__dirname, staticPath)));
app.use('/details', express.static(path.resolve(__dirname, staticPath)));
app.use('/login', express.static(path.resolve(__dirname, staticPath)));
app.use('/signup', express.static(path.resolve(__dirname, staticPath)));
app.use('/favorites', express.static(path.resolve(__dirname, staticPath)));

/////////////* USER ACCOUNT ROUTES *////////////////

//takes parameters username and password
app.post('/signup', signup);

//takes parameters username and password
app.post('/login', login);

///////////////*DRINK MENU ROUTES*////////////////

//takes parameters drink_name, place_id, and recommend (boolean)
app.post('/drinkmenu', addDrink);

//takes parameters drink_id and rating (1 = upvote, anything-but-1 = downvote)
app.post('/drinkrating', rateDrink);

//takes parameter place_id, returns all drink objects (which include drink_name and rating) assoicated with that shop (array of obj)
app.get('/drinkmenu', getDrinkRatings);

//takes a parameter, shops (an array of place_ids), and returns an array of all drinks serverd by those places
app.get('/shopsdrinks', getShopsDrinks);

//////////////*SHOP RATING ROUTEs*//////////////

//takes parameters place_id and rating (1 = upvote, anything-but-1 = downvote) - if place does not exist, inserts place into DB with inital rating of 1 or 0 depending on passed parameter - if place does exist, increments/decrements its rating
app.post('/shopratings', addShopRating);

//takes paramater shops (an array of place_ids) and returns an array of shop objects
app.get('/shopratings', getShopRatings);

//////////////*USER FAVORITES ROUTES*//////////////

//takes parameters isCoffee (boolean), user_id, place_id, and drink_id (if is coffee) and adds to favorites table if it's not already present associated with that user
app.post('/favorites', addUserFavorite);

//takes parameter user_id and returns an object of arrays of objects (lol) with that user's favorites: {drinks: [{}, {}], shops:[{}, {}]}
app.get('/userfavorites', getUserFavorites);

//////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
