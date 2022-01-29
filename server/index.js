const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const controllers = require('./controllers.js');
const path = require('path');
const { pool } = require('../database');
const utils = require('./hashUtils.js');

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

//ROUTE FOR CREATING USER
app.post('/signup', (req, res) => {
  //CHECKS IF USER WITH GIVEN USERNAME ALREADY EXISTS
  pool.query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
    .then(data => {
      //IF NOT, CREATES USER, SALT, AND HASHED PASSWORD ->
      if (data.rows.length === 0 || data.rows === undefined) {
        let salt = utils.createRandom32String();
        let password = utils.createHash(req.body.password, salt);

        //STORES USERNAME, HASHED PWORD, AND SALT IN DB
        pool.query(`INSERT INTO users (username, password, salt) VALUES ('${req.body.username}', '${password}', '${salt}')`)
          .then(x => {
            console.log('user created');
            res.redirect('/login');
          })
          .catch(err => { throw err; });
      } else {
        //IF USER ALREADY EXISTS, REDIRECT TO SIGNUP
        console.log(`USER WITH USERNAME ${req.body.username} ALREADY EXISTS`)
        res.redirect('/signup');
      }
    })
    .catch(err => { throw err; });
});

//ROUTE FOR LOGGING IN
app.post('/login', (req, res) => {
  pool.query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
    .then(data => {
      let user = data.rows[0];

      //IF USERNAME IS NOT IN DATABASE -> 404/USER NOT FOUND
      if (user === undefined) {
        res.status(404).send('user not found');
      }
      //IF USERNAME IS IN DB AND PROVIDED PASSWORD HASHED WITH SALT RETURNED FROM QUERY MATCHES PASSWORD STORED IN DB
      else if (utils.compareHash(req.body.password, user.password, user.salt)){
        console.log('login successful');
        res.redirect('/');
      } else {
        //IF PASSWORDS DON'T MATCH
        console.log('invalid password');
        res.redirect('/login');
      }
    });
});


///////////////*DRINK MENU ROUTES*////////////////


app.post('/drinkmenu', (req, res) => {
  let rating = 0;
  if (req.body.recommend) rating = 1;

  let drinkName = req.body.drink_name.toLowerCase();

  pool.query(`SELECT * FROM drinks WHERE drink_name = '${drinkName}' AND place_id = '${req.body.place_id}'`)
    .then(data => {
      if (data.rows.length > 0) {
        res.status(400).send('Drink already exists in menu.');
      } else {
        pool.query(`INSERT INTO drinks (drink_name, drink_rating, place_id) VALUES ('${drinkName}', ${rating}, '${req.body.place_id}')`)
          .then(x => { res.status(200).send('Drink added!'); })
          .catch(err => {
            res.status(500).send();
            console.error(err);
          });
      }
    });
});

app.post('/drinkrating', (req, res) => {
  if (req.body.rating === '1') {
    pool.query(`UPDATE drinks SET drink_rating = drink_rating + 1 WHERE id = ${Number(req.body.drink_id)}`)
      .then(x => {
        res.status(200).send('Drink rating updated +1!')
      })
      .catch(err => {
        res.status(500).send();
        console.error(err);
       });
  } else {
    pool.query(`UPDATE drinks SET drink_rating = drink_rating - 1 WHERE id = ${Number(req.body.drink_id)}`)
      .then(x => {
        res.status(200).send('Drink rating updated -1!');
      })
      .catch(err => {
        res.status(500).send();
        console.error(err);
      });
  }
});

//////////////*SHOP RATING ROUTEs*//////////////

app.post('/shopratings', (req, res) => {
  pool.query(`SELECT shop_rating FROM shops WHERE place_id = '${req.body.place_id}'`)
    .then(data => {
      if (data.rows.length > 0) {
        if (req.body.rating === '1') {
          pool.query(`UPDATE shops SET shop_rating = shop_rating + 1 WHERE place_id = '${req.body.place_id}'`)
            .then(x => { res.status(200).send('Review updated +1!'); })
            .catch(err => {
              res.status(500).send();
              console.error(err);
            });
        } else {
          pool.query(`UPDATE shops SET shop_rating = shop_rating - 1 WHERE place_id = '${req.body.place_id}'`)
            .then(x => { res.status(200).send('Review updated -1!'); })
            .catch(err => {
              res.status(500).send();
              console.error(err);
            });
        }
      } else {
        if (req.body.rating === '1') {
          pool.query(`INSERT INTO shops (place_id, shop_rating) VALUES ('${req.body.place_id}', 1.0)`)
            .then(x => { res.status(200).send('Shop rating added!'); })
            .catch(err => {
              res.status(500).send();
              console.error(err);
            });
        } else {
          pool.query(`INSERT INTO shops (place_id, shop_rating) VALUES ('${req.body.place_id}', 0)`)
            .then(x => { res.status(200).send('Shop rating added!'); })
            .catch(err => {
              res.status(500).send();
              console.error(err);
            });
        }
      }
    });
});











app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
