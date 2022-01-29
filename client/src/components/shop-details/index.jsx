import React from 'react';
import styled from 'styled-components';
import {
  Background,
  Accent,
  Highlight,
  AccentButton,
  HighlightButton,
  Input,
  FlexRow,
  FlexCol,
} from '../Styled.jsx';
import ShopInfo from './ShopInfo.jsx';
import DrinkList from './DrinkList.jsx';
import AddDrink from './AddDrink.jsx';

const GreenBackground = styled(Background)`
  background-color: green;
`;

const Column = styled(FlexCol)`
  flex-basis: 100%;
  flex: 1;
`;

function ShopDetails(props) {
  return (
    <Background>
      <Column>
        <ShopInfo />
        <DrinkList />
        <AddDrink />
      </Column>
    </Background>
  );
}

export default ShopDetails;
