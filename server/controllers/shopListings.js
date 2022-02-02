
const { findShops, findLocation, getPhotosOfShops } = require('../models');
const { shopsRatingsQuery } = require('./shopRatings.js');
const { shopsDrinksQuery } = require('./drinkMenu.js');

const distanceToDestination = ({lat: lat1, lng: lng1}, {lat: lat2, lng: lng2}) => {
  const earthRadius = 6371e3; // metres
  const lat1Rad = lat1 * Math.PI / 180;
  const lat2Rad = lat2 * Math.PI / 180;
  const deltaLat = (lat2 - lat1) * Math.PI / 180;
  const deltaLng = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c / 1000; // km
  return distance; //km
}

const listsOfShops = async (query, location) => {

  // query is the string typed by the user on the client side.
  // location should be an object with lat/lng coordinates | example {lat: 23.3453, lng:10.7546}
  let queryString = query.split(' ').join('+');
  let locationQuery = `${location.lat}%2C${location.lng}`;
  let shops = await findShops(queryString, locationQuery);
  for (const shop of shops) {
    shop.distance = distanceToDestination(location, shop.geometry.location)
  }
  return addRatingsAndMenus(shops)
};

const listsOfShopsByLocation = async (query, location) => {

  let locationString = location.split(' ').join('+');
  let data =  await findLocation(locationString);
  const shops = await listsOfShops(query, data.results[0].geometry.location);
  for (const shop of shops) {
    shop.distance = distanceToDestination(data.results[0].geometry.location, shop.geometry.location)
  }
  return shops
}

const shopImage = async (shop) => {

  let shopObj = JSON.parse(shop);
  let reference = shopObj.photos[0].photo_reference;

  let imageURL = await getPhotosOfShops(reference);
  return imageURL

}

//saturates shops with ratings and drinks
const addRatingsAndMenus = async (shops) => {
  const shopIds = JSON.stringify(shops.map((shop) => shop.place_id))
    .replaceAll(',"', ", ")
    .replaceAll('"', '')
  const shopRatings = await shopsRatingsQuery(shopIds);
  const shopMenus = await shopsDrinksQuery(shopIds);
  for (const shop of shops) {
    shop.shop_rating = 0;
    for (const shopRating of shopRatings) {
      if (shop.place_id === shopRating.place_id) {
        shop.shop_rating = shopRating.shop_rating
        break;
      }
    }
    shop.drinks = [];
    for (const drink of shopMenus) {
      if (shop.place_id === drink.place_id) {
        shop.drinks.push(drink)
      }
    }
  }
  return shops;
}

const getShopList = async (req, res) => {
  let data;
  if (req.body.customLocation){
    data = await listsOfShopsByLocation('coffee shops', req.body.customLocation)
  } else {
    let jsonStr = req.body.location.replace('{', '{"').replaceAll(':', '":').replace(', l', ', "l');
    let newLocationObj = JSON.parse(jsonStr);
    data = await listsOfShops('coffee shops', newLocationObj);
  }

  if (data) { res.status(200).send(data) } else {
    res.status(500).send();
  }
}

const getShopImage = async (req, res) => {
  let data = await shopImage(req.body.shop);

  if (data) { res.status(200).send(data) } else {
    res.status(500).send();
  }
};

module.exports = { listsOfShops, getShopImage, listsOfShopsByLocation, getShopList }

