const { findShops, findLocation, getPhotosOfShops } = require('../models');

const listsOfShops = async (query, location) => {

  // query is the string typed by the user on the client side.
  // location should be an object with lat/lng coordinates | example {lat: 23.3453, lng:10.7546}
  let queryString = query.split(' ').join('+');
  let locationQuery = `${location.lat}%2C${location.lng}`;
  let shops = await findShops(queryString, locationQuery);
  return shops

};

const listsOfShopsByLocation = async (query, location) => {

  let locationString = location.split(' ').join('+');
  let data =  await findLocation(locationString);
  return listsOfShops(query, data.results[0].geometry.location)

}

const getShopImage = async (shop) => {

  let reference = shop.photos[0].photo_reference;
  let imageURL = await getPhotosOfShops(reference);
  return imageURL

}

module.exports = { listsOfShops, getShopImage, listsOfShopsByLocation }