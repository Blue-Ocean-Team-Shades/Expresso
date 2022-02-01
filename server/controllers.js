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

const listsOfShops = async (query, location, callback) => {

  // query is the string typed by the user on the client side.
  // location should be an object with lat/lng coordinates | example {lat: 23.3453, lng:10.7546}
  let queryString = query.split(' ').join('+');
  let locationQuery = `${location.lat}%2C${location.lng}`;

  let shops = await models.findShops(queryString, locationQuery);

  return shops

};

const getShopImage = async (shop) => {

  let reference = shop.photos[0].photo_reference;
  let imageURL = await models.getPhotosOfShops(reference);

  return imageURL

}


module.exports.get = get;
module.exports.post = post;
module.exports.listsOfShops = listsOfShops;
module.exports.getShopImage = getShopImage;
