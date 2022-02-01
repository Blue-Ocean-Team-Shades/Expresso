const { pool } = require("../../database");


const addShopRating = (req, res) => {
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
          pool.query(`INSERT INTO shops (place_id, shop_rating) VALUES ('${req.body.place_id}', 1)`)
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
};

const getShopRatings = (req, res) => {
  let queryArg = req.body.shops.replace(/, /g, "', '").replace('[', "('").replace(']', "')");

  pool.query(`SELECT * FROM shops WHERE place_id IN ${queryArg}`)
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send();
    });
};

module.exports = { addShopRating, getShopRatings };