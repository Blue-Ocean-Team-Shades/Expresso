const db = require('../database/index.js');

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

module.exports.getAll = getAll;
module.exports.create = create;
