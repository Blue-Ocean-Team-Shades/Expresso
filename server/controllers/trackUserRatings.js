const { pool } = require('../../database');

const userRatedShop = (place_id, user_id, isUpvote) => {
  /*
    make alreadyVoted variable and set to false
    query user_shop_votes table to find a row where place_id = inputed place_id
    and user_id = user_id from current session
      if it doesn't exist create it with the default values
      if isUpvote is true
        if user hasn't already upvoted
          update row where user_id and place_id = inputed values so that
          upvote is true and downvote is false
        else set alreadyVoted to true and return it
      else
        if user hasn't already downvoted
          update row where user_id and place_id = inputed values so that
          upvote is false and downvote is true
        else set alreadyVoted to true and return it
    return alreadyVoted
  */
  let alreadyVoted = false;
  pool.query(`SELECT * FROM user_rated_shop WHERE place_id = ${place_id} AND user_id = ${user_id}`)
    .then(data => {
      console.log(data.rows[0]);
      if (data.rows.length === 0) {
        pool.query(`INSERT INTO user_rated_shop(place_id, user_id) VALUES (${place_id}, ${user_id})`);
      }
      return data;
    })
    .then(data => {
      if (isUpvote) {
        if (!data.rows[0].upvoted) {
          pool.query(`UPDATE user_rated_shop SET upvoted = ${true}, downvoted = ${false} WHERE place_id = ${place_id} AND user_id = ${user_id}`);
        } else {
          alreadyVoted = true;
        }
      } else {
        if (!data.rows[0].downvoted) {
          pool.query(`UPDATE user_rated_shop SET upvoted = ${false}, downvoted = ${true} WHERE place_id = ${place_id} AND user_id = ${user_id}`);
        } else {
          alreadyVoted = true;
        }
      }
    })
    .then(() => {
      return alreadyVoted;
    })
    .catch(err => console.log('Error updating user\'s shop vote', err));
}

const userRatedCoffee = async (drink_id, user_id, isUpvote) => {
  let userVote;

  try {
    userVote = await pool.query(`SELECT * FROM user_rated_drink WHERE drink_id = ${drink_id} AND user_id = ${user_id};`);
  } catch (err) {
    console.error('Error getting user_rated_drinks: ', err);
  }

  try {
    if (userVote.rows[0].length === 0) {
      await pool.query(`INSERT INTO user_rated_drink(drink_id, user_id) VALUES (${drink_id}, ${user_id});`);
    };
  } catch (err) {
    console.error('Error inserting new drink rating into user_rated_drinks: ', err);
  }

  try {
    if (isUpvote) {
      if(!userVote.rows[0].upvoted) {
        await pool.query(`UPDATE user_rated_drink SET upvoted = true, downvoted = false WHERE drink_id = ${drink_id} AND user_id = ${user_id};`);
      } else {
        return true;
      }
    } else if (!isUpvote) {
      if (!userVote.rows[0].downvoted) {
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