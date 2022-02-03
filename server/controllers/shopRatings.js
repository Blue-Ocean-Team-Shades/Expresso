const { pool } = require("../../database");


const addShopRating = async (req, res) => {
  let shopRatingData;

  if (req.session.isLoggedIn) {
    try {
      shopRatingData = await pool.query(`SELECT shop_rating FROM shops WHERE place_id = '${req.body.place_id}'`);
    } catch (err) {
      console.error('Error getting shop_rating: ', err);
    }

    if (shopRatingData.rows.length > 0) {

      if (req.body.rating === '1') {  // If shop is upvoted
        if (await userRatedShop(req.body.place_id, req.session.user_id, true)) {
          console.log('This user has already upvoted this shop!');
          return;
        } else {
          try {
            await pool.query(`UPDATE shops SET shop_rating = shop_rating + 1 WHERE place_id = '${req.body.place_id}'`);
            res.status(200).send('Review updated +1!');
          } catch (err) {
            res.status(500).send();
            console.error('Error updating shop_rating with upvote: ', err);
          }
        }
      } else {  // If shop is downvoted
        if (await userRatedShop(req.body.place_id, req.session.user_id, false)) {
          console.log('This user has already downvoted this shop!');
          return;
        } else {
          try {
            await pool.query(`UPDATE shops SET shop_rating = shop_rating - 1 WHERE place_id = '${req.body.place_id}'`);
            res.status(200).send('Review updated -1!');
          } catch (err) {
            res.status(500).send();
            console.error('Error updating shop_rating with downvote: ', err);
          }
        }
      }
    } else {  // If shop hasn't been rated yet
      if (req.body.rating === '1') {  // If shop is upvoted
        if (await userRatedShop(req.body.place_id, req.session.user_id, true)) {
          console.log('This user has already upvoted this shop!');
          return;
        } else {
          try {
            await pool.query(`INSERT INTO shops (place_id, shop_rating) VALUES ('${req.body.place_id}', 1)`);
            res.status(200).send('Shop rating added!');
          } catch (err) {
            res.status(500).send();
            console.error(err);
          }
        }
      } else {  // If shop is downvoted
        if (await userRatedShop(req.body.place_id, req.session.user_id, false)) {
          console.log('This user has already downvoted this shop!');
          return;
        } else {
          try {
            await pool.query(`INSERT INTO shops (place_id, shop_rating) VALUES ('${req.body.place_id}', 0)`);
            res.status(200).send('Shop rating added!');
          } catch (err) {
            res.status(500).send();
            console.error(err);
          }
        }
      }
    }

  } else { // If user isn't logged in
    alert('Please login to rate coffee shops');
    res.redirect('/login');
  }
};

const getShopRatings = (req, res) => {
  shopsRatingsQuery(req.body.shops)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send();
    });
};

const shopsRatingsQuery = (shops) => {
  let queryArg = shops.replace(/, /g, "', '").replace('[', "('").replace(']', "')");
  return pool.query(`SELECT * FROM shops WHERE place_id IN ${queryArg}`)
    .then((data) => data.rows);
}

module.exports = { addShopRating, getShopRatings, shopsRatingsQuery };