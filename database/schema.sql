\c postgres;
DROP DATABASE IF EXISTS expresso;
CREATE DATABASE expresso;
\c expresso;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(40) NOT NULL UNIQUE,
  password VARCHAR(64) NOT NULL,
  salt VARCHAR(64) NOT NULL
);

DROP TABLE IF EXISTS shops CASCADE;
CREATE TABLE IF NOT EXISTS shops (
  id SERIAL PRIMARY KEY,
  place_id TEXT,
  shop_rating DECIMAL
);

DROP TABLE IF EXISTS drinks CASCADE;
CREATE TABLE IF NOT EXISTS drinks (
  id SERIAL PRIMARY KEY,
  drink_name TEXT NOT NULL,
  drink_rating DECIMAL,
  place_id TEXT
);

DROP TABLE IF EXISTS favorites;
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL NOT NULL PRIMARY KEY,
  isCoffee BOOLEAN NOT NULL,
  user_id INT REFERENCES users(id),
  place_id TEXT,
  drink_id INT REFERENCES drinks(id)
);

DROP TABLE IF EXISTS user_rated_drink;
CREATE TABLE IF NOT EXISTS user_rated_drink (
  id SERIAL PRIMARY KEY,
  drink_id INT REFERENCES drinks(id),
  user_id INT REFERENCES users(id),
  upvoted BOOLEAN DEFAULT false,
  downvoted BOOLEAN DEFAULT false
);

DROP TABLE IF EXISTS user_rated_shop;
CREATE TABLE IF NOT EXISTS user_rated_shop (
  id SERIAL PRIMARY KEY,
  place_id TEXT,
  user_id INT REFERENCES users(id),
  upvoted BOOLEAN DEFAULT false,
  downvoted BOOLEAN DEFAULT false
);