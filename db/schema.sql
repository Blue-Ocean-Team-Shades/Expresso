DROP DATABASE IF EXISTS expresso;
CREATE DATABASE IF NOT EXISTS expresso;
\c expresso

DROP TABLE IF EXISTS users;
CREATE TABLE  IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(40) NOT NULL UNIQUE,
  password VARCHAR(64) NOT NULL,
  salt VARCHAR(64) NOT NULL
);

DROP TABLE IF EXISTS shops;
CREATE TABLE IF NOT EXISTS shops (
  id SERIAL PRIMARY KEY,
  shop_id TEXT,
  shop_rating DECIMAL
);

DROP TABLE IF EXISTS drinks;
CREATE TABLE IF NOT EXISTS drinks (
  id SERIAL PRIMARY KEY,
  drink_name TEXT NOT NULL,
  drink_rating DECIMAL,
  shop_id INT REFERENCES shops(id)
);

DROP TABLE IF EXISTS favorites;
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL NOT NULL,
  isCoffee BOOLEAN NOT NULL,
  user_id INT REFERENCES users(id),
  shop_id INT REFERENCES shops(id),
  drink_id INT REFERENCES drinks(id)
);