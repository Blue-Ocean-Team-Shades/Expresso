const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let port = 3000;
const path = require('path');
const { pool } = require('../database');
const utils = require('./hashUtils.js');
const session = require('express-session');
const store = require('connect-pg-simple')(session);
const { secret } = require('../config.js');
const { login, signup, logout } = require('./controllers/userAccounts');
const { addDrink, rateDrink, getDrinkRatings, getShopsDrinks } = require('./controllers/drinkMenu');
const { addShopRating, getShopRatings } = require('./controllers/shopRatings');
const { addUserFavorite, getUserFavorites } = require('./controllers/userFavorites');
const { getShopList, getShopImage } = require('./controllers/shopListings');

const fs = require('fs')
const http = require('http')
const https = require('https')
let secure = false;

let httpServer;
let httpsServer;

if (fs.existsSync('/etc/letsencrypt/live/thebest.graphics/privkey.pem') && fs.existsSync('/etc/letsencrypt/live/thebest.graphics/fullchain.pem')) {
  port = 80;
  secure = true;
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/thebest.graphics/privkey.pem')
  const certificate = fs.readFileSync('/etc/letsencrypt/live/thebest.graphics/fullchain.pem')
  const credientials = {key: privateKey, cert: certificate}

  httpServer = http.createServer(app)
  httpsServer = https.createServer(credientials, app)
  app.enable('trust proxy')
  app.use(function(request, response, next) {

      if (process.env.NODE_ENV != 'development' && !request.secure) {
         return response.redirect("https://" + request.headers.host + request.url);
      }

      next();
  })
}

app.use(express.json());
app.use(express.urlencoded());
app.use(session({
  store: new store({
    pool: pool,
    tableName: 'session',
    createTableIfMissing: true
  }),
  name: 'expressoid',
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24,
  }
}));

//janky fix, but it's fine because we're replacing all this with subdomains anyways
const staticPath = '../client/dist';
app.use('/', express.static(path.resolve(__dirname, staticPath)));
app.use('/details', express.static(path.resolve(__dirname, staticPath)));
app.use('/login', express.static(path.resolve(__dirname, staticPath)));
app.use('/signup', express.static(path.resolve(__dirname, staticPath)));

/////////////* USER ACCOUNT ROUTES *////////////////

//takes parameters username and password
app.post('/signup', signup);

//takes parameters username and password
app.post('/login', login);

app.post('/logout', logout);

///////////////*DRINK MENU ROUTES*////////////////

//takes parameters drink_name, place_id, and recommend (boolean)
app.post('/drinkmenu', addDrink);

//takes parameters drink_id and rating (1 = upvote, anything-but-1 = downvote)
app.post('/ratedrink', rateDrink);

//takes parameter place_id, returns all drink objects (which include drink_name and rating) assoicated with that shop (array of obj)
app.get('/getdrinkratings', getDrinkRatings);

//takes a parameter, shops (an array of place_ids), and returns an array of all drinks serverd by those places
app.get('/getshopsdrinks', getShopsDrinks);

//////////////*SHOP RATING ROUTEs*//////////////

//takes one of two parameters: either customLocation (string, location search terms) or location (object, {lat: 1234532, lng: 123124235}), and returns an array of shop objects
app.get('/findshops', getShopList);

//takes parameters place_id and rating (1 = upvote, anything-but-1 = downvote) - if place does not exist, inserts place into DB with inital rating of 1 or 0 depending on passed parameter - if place does exist, increments/decrements its rating
app.post('/shopratings', addShopRating);

// takes paramater shops (an array of place_ids) and returns an array of shop objects
app.post('/getshopratings', getShopRatings);

//takes a parameter, shop (a shop object from state), and returns the associated image
app.get('/getshopimage', getShopImage);

//////////////*USER FAVORITES ROUTES*//////////////

//takes parameters isCoffee (boolean), user_id, place_id, and drink_id (if is coffee) and adds to favorites table if it's not already present associated with that user
app.post('/favorites', addUserFavorite);

//takes parameter user_id and returns an object of arrays of objects (lol) with that user's favorites: {drinks: [{}, {}], shops:[{}, {}]}
app.get('/getuserfavorites', getUserFavorites);


app.get('/cookiedata', (req, res) => {
  pool.query(`SELECT * FROM session WHERE sid = '${req.query.sid}'`)
    .then(data => {
      let session = data.rows[0].sess;
      let user = {
        user_id: session.user_id,
        username: session.username
      };
      res.status(200).send(user);
    })
    .catch(err => res.status(500).send(err));
});

if (secure) {
  //////////////////////////////////////////////////
  httpServer.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
  httpsServer.listen(443, () => {
    console.log('listening securely on port 443')
  });
} else {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port} ... no HTTPS in this one!`);
  });
}
