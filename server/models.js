const db = require('../database/index.js');
const axios = require('axios');
const { placesKey } = require('../config.js');


const findShops = async (queryString, locationQuery) => {

  let { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?location=${locationQuery}&query=${queryString}&radius=2000&key=${placesKey}`);
  return data.results

};

const findLocation = async (locationString) => {

  let { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${locationString}&key=${placesKey}`)
  return data

}

const getPhotosOfShops = async (photoReference) => {

  let data = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoReference}&maxwidth=1600&maxheight=1600&key=${placesKey}`);
  return data.request.res.responseUrl

};


module.exports = { findShops, findLocation, getPhotosOfShops }
