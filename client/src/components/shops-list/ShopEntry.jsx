import React from 'react';
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

const HighlightDot = styled.div`
  ${styleHighlightButton}
  border-radius: 50%;
  width: 0.5em;
  height: 0.5em;
  content: '&nbsp;';
`;

function ShopEntry({ shop, setCurrentShop, cookies }) {
  const navigate = useNavigate();
  function viewShop() {
    setCurrentShop(shop);
    navigate(`/details/`);
  }

  const mi = cookies.units_miles ? 0.621371 : 1;

  return (
    <AccentButton onClick={() => viewShop(shop)}>
      <div>
        <em>{shop.name}</em>
      </div>
      <HighlightDot />
      <div>Rating: {shop.rating}</div>
      <HighlightDot />
      <div>
        Distance: {Math.round(shop.distance * mi * 10) / 10} {cookies.units_miles ? ' mi' : ' km'}
      </div>
    </AccentButton>
  );
}

export default ShopEntry;
