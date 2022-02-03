import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HighlightButton } from '../Styled.jsx';
import likeShop from '../../api.js';
import api from '../../api.js';

function LikeShop({
  currentShop,
  cookies,
  isLoggedIn,
  favoriteShops,
  setFavoriteShops,
}) {
  if (!isLoggedIn()) return null;

  function likeHandler(e) {
    api.likeShop(currentShop.place_id, cookies.user_id)
      .then(() => {
        const newFavoriteShops = Object.assign({}, favoriteShops)
        newFavoriteShops[currentShop.place_id] = true;
        setFavoriteShops(newFavoriteShops)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return <HighlightButton disabled={favoriteShops[currentShop.place_id]} onClick={likeHandler}>Favorite</HighlightButton>;
}

export default LikeShop;
