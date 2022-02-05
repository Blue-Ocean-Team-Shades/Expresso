const { pool } = require('../../database');

const userRatedShop = async (place_id, user_id, isUpvote) => {
  let userVote;

  try {
    userVote = await pool.query(`SELECT * FROM user_rated_shop WHERE place_id = ${place_id} AND user_id = ${user_id};`);
  } catch (err) {
    console.error('Error getting user_rated_shops: ', err);
  }

  try {
    if (userVote.rows[0].length === 0) {
      await pool.query(`INSERT INTO user_rated_shop(place_id, user_id) VALUES (${place_id}, ${user_id});`);
    };
  } catch (err) {
    console.error('Error inserting new shop rating into user_rated_shops: ', err);
  }

  try {
    if (isUpvote) {
      if(!userVote.rows[0].upvoted) {
        await pool.query(`UPDATE user_rated_shop SET upvoted = true, downvoted = false WHERE place_id = ${place_id} AND user_id = ${user_id};`);
      } else {
        return true;
      }
    } else if (!isUpvote) {
      if (!userVote.rows[0].downvoted) {
        await pool.query(`UPDATE user_rated_shop SET upvoted = false, downvoted = true WHERE place_id = ${place_id} AND user_id = ${user_id};`);
      } else {
        return true;
      }
    }
  } catch (err) {
    console.error('Error updating user_rated_shops: ', err);
  }
}

const userRatedCoffee = async (drink_id, user_id, isUpvote) => {
  let userVote;

  try {
    userVote = await pool.query(`SELECT * FROM user_rated_drink WHERE drink_id = ${drink_id} AND user_id = ${user_id};`);
  } catch (err) {
    console.error('Error getting user_rated_drinks: ', err);
  }

  try {
    if (userVote.rows.length === 0) {
      userVote = await pool.query(`INSERT INTO user_rated_drink(drink_id, user_id) VALUES (${drink_id}, ${user_id}) RETURNING *;`);
    };
  } catch (err) {
    console.error('Error inserting new drink rating into user_rated_drinks: ', err);
  }

  try {
    if (isUpvote) {
      if(!userVote.rows.upvoted) {
        await pool.query(`UPDATE user_rated_drink SET upvoted = true, downvoted = false WHERE drink_id = ${drink_id} AND user_id = ${user_id};`);
      } else {
        return true;
      }
    } else if (!isUpvote) {
      if (!userVote.rows.downvoted) {
        await pool.query(`UPDATE user_rated_drink SET upvoted = false, downvoted = true WHERE drink_id = ${drink_id} AND user_id = ${user_id};`);
      } else {
        return true;
      }
    }
  } catch (err) {
    console.error('Error updating user_rated_drinks: ', err);
  }
};

module.exports = { userRatedShop, userRatedCoffee };