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
  colors,
} from '../Styled.jsx';
import ShopInfo from './ShopInfo.jsx';
import DrinkList from './DrinkList.jsx';
import AddDrink from './AddDrink.jsx';
import api from '../../api.js';
import LikeShop from '../shared/LikeShop.jsx';
import Image from './Image.jsx';
import { useNavigate } from 'react-router-dom';

const StyledLikeShop = styled(LikeShop)`
  && {
    background-color: red;
    color: white;
    &:hover {
      background-color: red;
    }
  }
  background-color: red;
`;

const LikeShopRow = styled(FlexRow)`
  justify-content: center;
`;

const ListBackground = styled(Background)`
  position: relative;
  background-color: ${colors.mainDark};
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
  @media (max-width: 768px) {
    position: inherit;
    padding: inherit;
    left: inherit;
    top: inherit;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: inherit;
    height: inherit;
  }
`;

const Inner = styled(FlexCol)`
  width: 60vw;
  height: 60vh;
  // max-height: 50vh;
  // height: 1200px;
  background-color: ${colors.highlightLight};
  // border: gray solid 1px;
  border-radius: 20px;
  max-width: 900px;
  @media (max-width: 768px) {
    width: -webkit-fill-available;
    height: inherit;
    border-radius: inherit;
  }
`;

function ShopDetails({
  currentShop,
  setCurrentShop,
  shops,
  setShops,
  isLoggedIn,
  cookies,
  favoriteShops,
  setFavoriteShops,
}) {
  const [drinks, setDrinks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentShop) return navigate('/');
    getDrinks(false).then(() => getImage());
  }, []);

  const getDrinks = (refresh = true) => {
    return api
      .getDrinks(currentShop.place_id)
      .then(({ data }) => {
        currentShop.drinks = data;
        if (refresh) setShops(shops.slice());
      })
      .catch((err) => console.log(err, '<<<<<<<'));
  };

  const getImage = () => {
    api
      .getImage(currentShop)
      .then(({ data }) => {
        currentShop.image = data;
        let tempShops = shops.slice();
        setShops(tempShops);
      })
      .catch((err) => console.log(err, '<<<<<<<'));
  };

  if (!currentShop) {
    return null;
  }
  return (
    <ListBackground>
      <Image image={currentShop.image || {}} />
      <Container>
        <Inner>
          <ShopInfo shop={currentShop || {}} />
          <LikeShopRow>
            <StyledLikeShop
              styles='backgroundColor: red;'
              currentShop={currentShop}
              cookies={cookies}
              isLoggedIn={isLoggedIn}
              favoriteShops={favoriteShops}
              setFavoriteShops={setFavoriteShops}
              favoritecolor={colors.highlight}
            />
          </LikeShopRow>
          <DrinkList
            drinks={currentShop.drinks || []}
            getDrinks={getDrinks}
            placeId={currentShop.place_id}
            isLoggedIn={isLoggedIn}
          />
          <AddDrink
            currentShop={currentShop}
            setCurrentShop={setCurrentShop}
            getDrinks={getDrinks}
            placeId={currentShop.place_id}
            isLoggedIn={isLoggedIn}
          />
        </Inner>
      </Container>
    </ListBackground>
  );
}

export default ShopDetails;
