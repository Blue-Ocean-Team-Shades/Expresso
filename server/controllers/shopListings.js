const models = require('../models');

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

const getShopList = async (req, res) => {
  let jsonStr = req.body.location.replace('{', '{"').replaceAll(':', '":').replace(', l', ', "l');
  let newLocationObj = JSON.parse(jsonStr);

  let data = await listsOfShops('coffee shops', newLocationObj);

  if (data) { res.status(200).send(data) } else {
    res.status(500).send();
  }
}

module.exports = { listsOfShops, getShopImage, listsOfShopsByLocation, getShopList }

