const { pool } = require("../../database");
const utils = require("../hashUtils.js");



const signup = (req, res) => {
  //CHECKS IF USER WITH GIVEN USERNAME ALREADY EXISTS
  pool
    .query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
    .then((data) => {
      //IF NOT, CREATES USER, SALT, AND HASHED PASSWORD ->
      if (data.rows.length === 0 || data.rows === undefined) {
        let salt = utils.createRandom32String();
        let password = utils.createHash(req.body.password, salt);

        //STORES USERNAME, HASHED PWORD, AND SALT IN DB
        pool
          .query(
            `INSERT INTO users (username, password, salt) VALUES ('${req.body.username}', '${password}', '${salt}')`
          )
          .then((x) => {
            pool.query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
              .then(data => {
                req.session.user_id = data.rows[0].id;
                req.session.isLoggedIn = true;
                req.session.username = req.body.username;
              })
              .catch(err => {
                throw err;
              });
            res.redirect(200, "/login");
          })
          .catch((err) => {
            throw err;
          });
      } else {
        //IF USER ALREADY EXISTS
        res
          .status(500)
          .send(`USER WITH USERNAME ${req.body.username} ALREADY EXISTS`);
      }
    })
    .catch((err) => {
      throw err;
    });
};

const login = (req, res) => {
  pool.query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
    .then(data => {
      let user = data.rows[0];

      //IF USERNAME IS NOT IN DATABASE -> 404/USER NOT FOUND
      if (user === undefined) {
        res.status(404).send('user not found');
      }
      //IF USERNAME IS IN DB AND PROVIDED PASSWORD HASHED WITH SALT RETURNED FROM QUERY MATCHES PASSWORD STORED IN DB
      else if (utils.compareHash(req.body.password, user.password, user.salt)){
        console.log('success');
        req.session.username = req.body.username;
        req.session.user_id = user.id;
        req.session.isLoggedIn = true;
        res.redirect(200, '/');
      } else {
        //IF PASSWORDS DON'T MATCH
        res.status(400).send('Invalid Password');
      }
    });
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    } else {
      res.clearCookie('expressoid');
      res.redirect('/');
    }
  });
}

module.exports = { signup, login, logout };
