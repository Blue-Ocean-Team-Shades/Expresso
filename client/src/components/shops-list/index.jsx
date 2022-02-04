import React, { useState } from 'react';
import TopBar from '../top-bar';
import styled from 'styled-components';
import { Switch, ToggleButtonGroup, ToggleButton } from '@mui/material/';
import {
  isMobile,
  Main,
  Background,
  Accent,
  Highlight,
  FlexRow,
  FlexCol,
  AccentButton,
  colors,
} from '../Styled.jsx';
import ShopEntry from './ShopEntry.jsx';

const FitWidth = styled(Background)`
  background-color: ${colors.mainDark};
  color: ${colors.mainLight};
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1em;
  box-sizing: border-box;
  height: fit-content;
  flex: 0;
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-elements: center;
  font-size: 2rem;
  z-index: 10;
  color: ${colors.highlight};
`;

const Shops = styled(Background)`
  display: flex;
  flex-direction: column;
`;

const BackgroundGradient = styled.div`
  background: linear-gradient(0deg, ${colors.main} 25%, ${colors.mainDark} 100%);
  position: absolute;
  width: 100%;
  height: 50vh;
  top: 100%;
`;

function sortFunc(sortBy, favoriteShops, sortByFavorite) {
  let sortDown = true;
  if (sortBy.startsWith('-')) {
    sortBy = sortBy.substring(1);
    sortDown = false;
  }
  return (a, b) => {
    if (sortByFavorite) {
      if (favoriteShops[a.place_id] && !favoriteShops[b.place_id]) return - 1;
      if (!favoriteShops[a.place_id] && favoriteShops[b.place_id]) return 1 ;
    }
    if (sortDown) return a[sortBy] - b[sortBy];
    return b[sortBy] - a[sortBy];
  };
}

const defaultFilters = {
  open: false,
  distance: 1000,
};

function filter(list, searchTerm, cookies) {
  searchTerm = searchTerm.toLowerCase();
  return list.filter((shop) => {
    //TODO: return false if shop doesn't match customizable filter
    if (!cookies.starbucks_allowed && shop.name === 'Starbucks') return false;
    if (searchTerm.length < 3) return true;
    if (shop.name.toLowerCase().includes(searchTerm)) return true;
    if (shop.drinks) {
      for (const drink of shop.drinks) {
        if (drink.drink_name.includes(searchTerm)) return true;
        //TODO: maybe indicate the matching drinks somehow
      }
    }
    return false;
  });
}

function ShopsList({
  shops,
  isFavorites,
  setCurrentShop,
  message,
  searchTerm,
  cookies,
  isLoggedIn,
  favoriteShops,
  setFavoriteShops,
}) {
  const [sort, setSort] = useState('distance');

  return (
    <Background>
      {isFavorites ? 'TODO: filter by favorites' : null}
      <FlexCol style={{ height: '100%', maxHeight:'100%' }}>
        <FitWidth style={{ position: 'relative' }}>
          <FlexRow>
          <h1>Expresso</h1>
          <AccentButton>Sort</AccentButton>
          </FlexRow>
          <BackgroundGradient />
        </FitWidth>
        {message ? (
          <Message>{message}</Message>
        ) : (
          <Main style={{ flex: 1, flexDirection: 'column', overflow: 'auto' }}>
            <Shops>
              {filter(shops, searchTerm, cookies)
                .sort(sortFunc(sort, favoriteShops, !cookies.favorites_not_at_top))
                .map((shop) => (
                  <ShopEntry
                    shop={shop}
                    key={shop.place_id}
                    setCurrentShop={setCurrentShop}
                    cookies={cookies}
                    isLoggedIn={isLoggedIn}
                    favoriteShops={favoriteShops}
                    setFavoriteShops={setFavoriteShops}
                  />
                ))}
            </Shops>
            <ToggleButtonGroup value={sort} exclusive onChange={(e) => setSort(e.target.value)}>
              <ToggleButton value='distance'>
                distance
              </ToggleButton>
              <ToggleButton value='-rating'>
                rating
              </ToggleButton>
            </ToggleButtonGroup>
          </Main>
        )}
      </FlexCol>
    </Background>
  );
}

export default ShopsList;
