import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

let dummyCurrentShop = dummyShops[0];

const ListBackground = styled(Background)`
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
  border-radius: 8px;
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

function ShopDetails({ currentShop, setCurrentShop }) {
  // sample getting shops
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    getDrinks();
  }, []);

  const getDrinks = () => {
    let optionsConfig = {
      params: {
        place_id: 'ChIJr0p1HSe5QIYRJbI_fFPj6e0',
      },
    };
    axios
      .get('/drinkmenu', optionsConfig)
      .then(({ data }) => setDrinks(data))
      .catch((err) => console.log(err));
  };

  return (
    <ListBackground>
      <Image />
      <Container>
        <Inner>
          <ShopInfo shop={dummyCurrentShop || {}} />
          {/* <DrinkList drinks={drinks ? shop.drinks : []} /> */}
          <DrinkList
            drinks={drinks || []}
            setDrinks={setDrinks}
            getDrinks={getDrinks}
          />
          <AddDrink
            currentShop={dummyCurrentShop}
            setCurrentShop={setCurrentShop}
            setDrinks={setDrinks}
            getDrinks={getDrinks}
          />
        </Inner>
      </Container>
    </ListBackground>
  );
}

export default ShopDetails;
