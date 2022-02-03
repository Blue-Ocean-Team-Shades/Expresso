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

const Em = styled.div`
  font-size: 1.1em;
  font-weight: 600;
`

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
        <FlexCol style={{ margin: 0, width: '100%' }}>
          <FlexRow style={{ justifyContent: 'center', alignItems: 'center', margin:0 }}>
            <HighlightDot />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Em>{shop.name}</Em>
            &nbsp;&nbsp;&nbsp;&nbsp;
               <HighlightDot />
          </FlexRow>
          <FlexRow style={{ justifyContent: 'center', alignItems: 'center', margin:0 }}>
            <div style={{flex: 1, textAlign: 'end'}}>Rating: {shop.rating}</div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <HighlightDot />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div style={{flex: 1, textAlign: 'start'}}>
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
