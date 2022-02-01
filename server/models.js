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


const findShops = async (queryString, locationQuery) => {

  let {data} = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?location=${locationQuery}&query=${queryString}&radius=2000&key=${placesKey}`);
  return data.results

};

const getPhotosOfShops = async (photoReference) => {

  let data = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoReference}&maxwidth=1600&maxheight=1600&key=${placesKey}`);
  return data.request.res.responseUrl

};


module.exports.getAll = getAll;
module.exports.create = create;
module.exports.findShops = findShops;
module.exports.getPhotosOfShops = getPhotosOfShops;
