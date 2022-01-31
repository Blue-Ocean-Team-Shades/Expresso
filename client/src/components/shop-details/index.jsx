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
import { dummyShops } from '../../dummyData.js';

// const { id, name, rating, drinks } = dummyShops[0];
let dummyCurrentShop = dummyShops[0];

const GreenBackground = styled(Background)`
  background-color: yellow;
  position: relative;
`;

const Column = styled(FlexCol)`
  flex-basis: 100%;
  flex: 1;
`;

const Container = styled(FlexRow)`
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 15vh;
  left: 50%;
  top: 0%;
  transform: translateX(-50%);
`;

const Inner = styled(FlexCol)`
  width: 60vw;
  height: 60vh;
  // max-height: 50vh;
  // height: 1200px;
  background-color: white;
  border: gray solid 1px;
`;

const Image = styled(Accent)`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://picsum.photos/300/200');
  height: 40vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

function ShopDetails({ currentShop }) {
  return (
    <GreenBackground>
      {currentShop ? `current shop: ${currentShop.name}` : null}
      <Image />
      <Container>
        <Inner>
          <ShopInfo shop={dummyCurrentShop || {}} />
          <DrinkList drinks={dummyCurrentShop ? dummyCurrentShop.drinks : []} />
          <AddDrink />
        </Inner>
      </Container>
    </GreenBackground>
  );
}

export default ShopDetails;

// https://picsum.photos/300/200
