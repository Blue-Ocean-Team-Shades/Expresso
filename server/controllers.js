const models = require('./models');

const get = (req, res) => {
  models.getAll((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

const post = (req, res) => {
  models.create(req, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

module.exports.get = get;
module.exports.post = post;
