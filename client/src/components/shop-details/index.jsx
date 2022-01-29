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

const Container = styled(FlexRow)`
  align-items: center;
  justify-content: center;
`;

const Inner = styled(FlexCol)`
  width: 80vw;
  height: 70vh;
  // max-height: 50vh;
  // height: 1200px;
  background-color: green;
`;

function ShopDetails(props) {
  return (
    <Background>
      <Container>
        <Inner>
          <ShopInfo />
          <DrinkList />
          <AddDrink />
        </Inner>
      </Container>
    </Background>
  );
}

export default ShopDetails;
