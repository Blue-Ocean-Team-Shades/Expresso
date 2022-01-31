const db = require('../database/index.js');
const axios = require('axios');
const { placesKey } = require('../config.js');


const getAll = (callback) => {
  let queryString = 'SELECT * FROM book_list_table_12'; // update query table
  db.query(queryString, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const create = (req, callback) => {
  const name = req.body.name;
  let obj = { name: name };
  let queryString = `INSERT INTO book_list_table_12 (name) VALUES ('${name}');`; // update query table
  db.query(queryString, (err, data) => {
    this.getAll((err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  });
};

// shops.data.results gives an array of the shop details.
// On client-side, when called, create a callback to tell this function what to do with the data.
const findShops = (query, callback) => {
  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${placesKey}`)
    .then((shops) => {
      callback(shops.data.results);
    })
    .catch((err) => {
      callback(err)
    })
};


module.exports.getAll = getAll;
module.exports.create = create;
module.exports.findShops = findShops;
