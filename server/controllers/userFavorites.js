const { pool } = require("../../database");

const addUserFavorite = (req, res) => {
  if (req.session.isLoggedIn) {
    if (req.body.isCoffee === 'true') {
      pool.query(`SELECT * FROM favorites WHERE user_id = ${req.session.user_id} AND drink_id = ${Number(req.body.drink_id)} AND place_id = '${req.body.place_id}'`)
        .then(data => {
          if (data.rows.length > 0) { res.status(400).send('This drink is already a favorite of yours!'); } else {
            pool.query(`INSERT INTO favorites (isCoffee, user_id, place_id, drink_id) VALUES (true, ${Number(req.body.user_id)}, '${req.body.place_id}', ${Number(req.body.drink_id)})`)
              .then(x => { res.status(200).send('Drink added to favorites!'); })
              .catch(err => {
                console.error(err);
                res.status(500).send();
              });
          }
        })
    } else {
      pool.query(`SELECT * FROM favorites WHERE user_id = ${req.session.user_id} AND place_id = '${req.body.place_id}'`)
        .then(data => {
          if (data.rows.length > 0) { res.status(400).send('This shop is already a favorite of yours!'); } else {
            pool.query(`INSERT INTO favorites (isCoffee, user_id, place_id, drink_id) VALUES (false, ${req.session.user_id}, '${req.body.place_id}', null)`)
              .then(x => { res.status(200).send('Shop added to favorites!'); })
              .catch(err => {
                console.error(err);
                res.status(500).send();
              });
          }
        })
        .catch(err => {
          console.error(err)
          res.status(500).send()
        })
    }
  } else {
    alert('Must be logged in to favorite shops and drinks');
    res.redirect('/login');
  }
};

const getUserFavorites = (req, res) => {
  let returnObject = {
    favoriteDrinks: [],
    favoriteShops: []
  };


  pool.query(`SELECT * FROM favorites WHERE user_id = ${req.session.user_id}`)
    .then(data => {
      for (let favorite of data.rows) {
        if (favorite['iscoffee']) { returnObject.favoriteDrinks.push(favorite) } else {
          returnObject.favoriteShops.push(favorite);
        }
      }

      res.status(200).send(returnObject);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send();
    });
};

module.exports = { addUserFavorite, getUserFavorites };