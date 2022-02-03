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
  colors
} from '../Styled.jsx';
import ShopInfo from './ShopInfo.jsx';
import DrinkList from './DrinkList.jsx';
import AddDrink from './AddDrink.jsx';
import api from '../../api.js';
import Image from './Image.jsx'

const ListBackground = styled(Background)`
  position: relative;
  background-color: ${colors.mainDark}
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
  background-color: ${colors.highlightLight};
  border: gray solid 1px;
  border-radius: 8px;
`;

// const Image = styled(Accent)`
//   background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
//     url('https://picsum.photos/300/200');
//   height: 40vh;
//   width: 100vw;
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
// `;

function ShopDetails({ currentShop, setCurrentShop, shops, setShops }) {
  // sample getting shop drinks from test google places shop
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    getDrinks(false).then(() => getImage())

  }, []);

  const getDrinks = (refresh=true) => {

    return api.getDrinks(currentShop.place_id)
      .then(({ data }) => {
        currentShop.drinks = data
        if (refresh) setShops(shops.slice())
      })
      .catch((err) => console.log(err, '<<<<<<<'));
  };

  const getImage = () => {
    api.getImage(currentShop)
      .then(({ data }) => {
        currentShop.image = data
        let tempShops = shops.slice()
        setShops(tempShops)
      })
      .catch((err) => console.log(err, '<<<<<<<'));
  };

  return (
    <ListBackground>
      <Image image={currentShop.image || {}}/>
      <Container>
        <Inner>
          <ShopInfo shop={currentShop || {}} />
          <DrinkList
            drinks={currentShop.drinks || []}
            getDrinks={getDrinks}
            placeId={currentShop.place_id}
          />
          <AddDrink
            currentShop={currentShop}
            setCurrentShop={setCurrentShop}
            getDrinks={getDrinks}
            placeId={currentShop.place_id}
          />
        </Inner>
      </Container>
    </ListBackground>
  );
}

export default ShopDetails;
