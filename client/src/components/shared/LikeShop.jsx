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
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favoriteShops && currentShop) {
      for (const favorite of favoriteShops) {
        if (favorite.place_id === currentShop.place_id) {
          setIsFavorite(true);
          return;
        }
        setIsFavorite(false);
      }
    }
  }, [currentShop, favoriteShops]);

  if (!isLoggedIn()) return null;

  function likeHandler(e) {
    api.likeShop(currentShop.place_id, cookies.user_id)
      .then(() => {
        const newFavoriteShops = favoriteShops.slice()
        newFavoriteShops.push(currentShop);
        setFavoriteShops(newFavoriteShops)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return <HighlightButton disabled={isFavorite} onClick={likeHandler}>Favorite</HighlightButton>;
}

export default LikeShop;
