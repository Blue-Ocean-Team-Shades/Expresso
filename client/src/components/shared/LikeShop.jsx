import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { styleHighlightButton, colors } from '../Styled.jsx';
import { IconButton } from '@mui/material/';
import likeShop from '../../api.js';
import api from '../../api.js';
import starEmpty from '../../assets/star-empty.svg';
import starFull from '../../assets/star-full.svg';

const StyledImg = styled.img`
  width: 1rem;
  height: 1rem;
`;

const ButtonStar = styled(IconButton)`
  ${styleHighlightButton}
  && {
    width: fit-content;
    height: fit-content;
    border-radius: 50%;
    background-color: ${({ normalcolor }) => normalcolor};
    :hover {
      background-color: ${({ hoveredcolor }) => hoveredcolor};
    }
  }
`;

function LikeShop({
  currentShop,
  cookies,
  isLoggedIn,
  favoriteShops,
  setFavoriteShops,
  normalcolor,
  hoveredcolor,
  favoritecolor,
}) {
  if (!isLoggedIn()) return null;

  function likeHandler(isLike) {
    api
      .likeShop(currentShop.place_id, !isLike)
      .then(() => {
        const newFavoriteShops = Object.assign({}, favoriteShops);
        if (isLike) {
          newFavoriteShops[currentShop.place_id] = true;
        } else {
          newFavoriteShops[currentShop.place_id] = undefined;
        }
        setFavoriteShops(newFavoriteShops);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (favoriteShops[currentShop.place_id]) {
    return (
      <ButtonStar
        onClick={() => likeHandler(false)}
        normalcolor={favoritecolor}
        hoveredcolor={hoveredcolor}
      >
        <StyledImg src={starFull} />
      </ButtonStar>
    );
  }

  return (
    <ButtonStar
      onClick={() => likeHandler(true)}
      normalcolor={normalcolor}
      hoveredcolor={hoveredcolor}
    >
      <StyledImg src={starEmpty} />
    </ButtonStar>
  );
}

export default LikeShop;
