#! /bin/bash

if [ ! -e "config.js" ]; then
  echo ""
  echo "Creating config file, please provide the following:"
  read -p "address to Postgres host (default localhost): " host
  if [ $host -eq '']; then
    host='localhost'
  fi
  read -p "Postgres user (default postgres): " user
  if [ $user -eq '']; then
    user='postgres'
  fi
  read -p "Postgres password (default no password): " -s password
  echo ""
  read -p "Places API key: " placesKey
  read -p "Express-session secret string: " secret
  echo "module.exports.host = '${host}';" > config.js
  echo "module.exports.user = '${user}';" >> config.js
  echo "module.exports.password = '${password}';" >> config.js
  echo "module.exports.placesKey = '${placesKey}';" >> config.js
  echo "module.exports.secret = '${secret}';" >> config.js
  echo "These choices can be changed any time by editing config.js (or deleting it and then re-running this script)"
fi
