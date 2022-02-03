import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Background,
  Accent,
  Highlight,
  FlexRow,
  FlexCol,
  AccentButton,
  styleHighlightButton,
} from '../Styled.jsx';
import { useNavigate } from 'react-router-dom';
import LikeShop from '../shared/LikeShop.jsx';

const HighlightDot = styled.div`
  ${styleHighlightButton}
  border-radius: 50%;
  width: 0.5em;
  height: 0.5em;
  content: '&nbsp;';
`;

function ShopEntry({ shop, setCurrentShop, cookies, isLoggedIn, favoriteShops, setFavoriteShops }) {
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();
  function viewShop() {
    setCurrentShop(shop);
    navigate(`/details/`);
  }

  const mi = cookies.units_miles ? 0.621371 : 1;

  return (
    <FlexRow
      style={{ alignItems: 'center' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AccentButton onClick={() => viewShop(shop)} style={{ flex: 1 }}>
        <FlexCol style={{ margin: 0 }}>
          <FlexRow style={{ justifyContent: 'space-around', alignItems: 'center' }}>
            <HighlightDot />
            <em>{shop.name}</em>
            <HighlightDot />
          </FlexRow>
          <FlexRow style={{ justifyContent: 'space-around', alignItems: 'center' }}>
            <div>Rating: {shop.rating}</div>
            <HighlightDot />
            <div>
              Distance: {Math.round(shop.distance * mi * 10) / 10}{' '}
              {cookies.units_miles ? ' mi' : ' km'}
            </div>
          </FlexRow>
        </FlexCol>
      </AccentButton>
      {favoriteShops[shop.place_id] || hovered ? (
        <LikeShop
          currentShop={shop}
          cookies={cookies}
          isLoggedIn={isLoggedIn}
          favoriteShops={favoriteShops}
          setFavoriteShops={setFavoriteShops}
        />
      ) : null}
    </FlexRow>
  );
}

export default ShopEntry;
