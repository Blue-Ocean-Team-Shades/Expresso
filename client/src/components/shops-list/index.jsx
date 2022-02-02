import React, { useState } from 'react';
import TopBar from '../top-bar';
import styled from 'styled-components';
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
  color: ${colors.highlight}
`;

const Shops = styled(Background)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BackgroundGradient = styled.div`
  background: linear-gradient(0deg, ${colors.main} 25%, ${colors.mainDark} 100%);
  position: absolute;
  width: 100%;
  height: 50vh;
  top: 100%;
`

function sortFunc(sortBy) {
  if (sortBy.startsWith('-')) {
    sortBy = sortBy.substring(1);
    return (a, b) => a[sortBy] - b[sortBy];
  }
  return (a, b) => b[sortBy] - a[sortBy];
}

const defaultFilters = {
  open: false,
  distance: 1000,
};

function filter(list, filters, searchTerm) {
  searchTerm = searchTerm.toLowerCase()
  return list.filter((shop) => {
    //TODO: return false if shop doesn't match customizable filter

    if (searchTerm.length < 3) return true;
    if (shop.name.toLowerCase().includes(searchTerm)) return true;
    if (shop.drinks) {
      for (const drink of shop.drinks) {
        if (drink.name.includes(searchTerm)) return true;
        //TODO: maybe indicate the matching drinks somehow
      }
    }
    return false;
  });
}

function ShopsList({ shops, isFavorites, setCurrentShop, message, searchTerm }) {
  const [sort, setSort] = useState('-distance');
  const [filters, setFilters] = useState(defaultFilters);

  return (
    <Background>
      {isFavorites ? 'TODO: filter by favorites' : null}
      <FlexCol style={{height: '100%'}}>
        <FitWidth style={{position: 'relative'}}>
          <h1>Expresso</h1>
          <BackgroundGradient />
        </FitWidth>
        {message ? (
          <Message>{message}</Message>
        ) : (
          <Main style={{flex: 1}}>
            <Shops>
              {filter(shops, filters, searchTerm)
                .sort(sortFunc(sort))
                .map((shop) => (
                  <ShopEntry shop={shop} key={shop.place_id} setCurrentShop={setCurrentShop} />
                ))}
            </Shops>
            <div>
              <FlexCol>
                Sort by
                <AccentButton disabled={sort === '-distance'} onClick={() => setSort('-distance')}>
                  distance
                </AccentButton>
                <AccentButton disabled={sort === 'rating'} onClick={() => setSort('rating')}>
                  rating
                </AccentButton>
                Show
                <AccentButton>open</AccentButton>
                <AccentButton>nearby</AccentButton>
              </FlexCol>
            </div>
          </Main>
        )}
      </FlexCol>
    </Background>
  );
}

export default ShopsList;
