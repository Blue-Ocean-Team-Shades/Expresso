const { pool } = require("../../database");

const addDrink = (req, res) => {
  if (req.session.isLoggedIn) {
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
  } else {
    alert('Please login to add a drink');
    res.redirect('/login');
  }
};

const rateDrink = (req, res) => {
  if (req.session.isLoggedIn) {
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
  } else {
    alert('Please login to rate drinks');
    res.redirect('/login');
  }
};

const getDrinkRatings = (req, res) => {
  pool.query(`SELECT * FROM drinks WHERE place_id = '${req.body.place_id}'`)
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
};

const getShopsDrinks = (req, res) => {
  const queryArg = req.body.shops.replace(/, /g, "', '").replace('[', "('").replace(']', "')");


  pool.query(`SELECT * FROM drinks WHERE place_id IN ${queryArg}`)
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send();
    });
};

module.exports = { addDrink, rateDrink, getDrinkRatings, getShopsDrinks };