const { pool } = require("../../database");

const addUserFavorite = (req, res) => {
  if (req.session.isLoggedIn) {
    if (req.body.isCoffee === 'true') {
      pool.query(`SELECT * FROM favorites WHERE user_id = ${req.session.user_id} AND drink_id = ${Number(req.body.drink_id)} AND place_id = '${req.body.place_id}'`)
        .then(data => {
          if (data.rows.length > 0) { res.status(400).send('This drink is already a favorite of yours!'); } else {
            pool.query(`INSERT INTO favorites (isCoffee, user_id, place_id, drink_id) VALUES (true, ${Number(req.session.user_id)}, '${req.body.place_id}', ${Number(req.body.drink_id)})`)
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

const removeUserFavorite = async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).send();
  }
  if (!req.query.place_id || (req.query.isCoffee && !req.query.drink_id)) {
    return res.status(400).send('Missing request data');
  }

  try {
    if (req.query.isCoffee) {
      await pool.query(
        'DELETE FROM favorites WHERE user_id = $1 AND place_id = $2 AND drink_id = $3',
        [req.session.user_id, req.query.place_id, req.query.drink_id]
      )
    } else {
      await pool.query(
        'DELETE FROM favorites WHERE user_id = $1 AND place_id = $2',
        [req.session.user_id, req.query.place_id]
      )
    }
    res.status(200).send()
  } catch(err) {
    console.error(err)
    res.status(500).send('unable to delete')
  }
}

module.exports = { addUserFavorite, getUserFavorites, removeUserFavorite };