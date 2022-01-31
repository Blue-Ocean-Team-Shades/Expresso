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
} from '../Styled.jsx';
import ShopEntry from './ShopEntry.jsx';

const FitWidth = styled(Background)`
  display: flex;
  justify-content: center;
  width: 100%;
  border: 1px solid black;
  padding: 1em;
  box-sizing: border-box
`;

const Message = styled(Background)`
  display: flex;
  justify-content: center;
  align-elements: center;
  font-size: 2rem;
`

const Shops = styled(Background)`
  display: flex;
  flex-direction: column;
`;

function sortFunc(sortBy) {
  if (sortBy.startsWith('-')) {
    sortBy = sortBy.substring(1)
    return (a, b) => a[sortBy] - b[sortBy]
  }
  return (a, b) => b[sortBy] - a[sortBy]
}

const defaultFilters = {
  open: false,
  distance: 1000,
}

function filter(list, filters){
  return list;
}

function ShopsList({ shops, isFavorites, setCurrentShop, message }) {
  const [sort, setSort] = useState('-distance');
  const [filters, setFilters] = useState(defaultFilters)
  return (
    <Background>
      {isFavorites ? 'TODO: filter by favorites' : null}
      <FlexCol>
        <FitWidth>
          <h1>Expresso</h1>
        </FitWidth>
        {message ? (
            <Message>{message}</Message>
          ) : (
            <Main>
              <Shops>
                {filter(shops, filters).sort(sortFunc(sort)).map((shop) => (
                  <ShopEntry shop={shop} key={shop.id} setCurrentShop={setCurrentShop} />
                ))}
              </Shops>
              <Accent>
                <FlexCol>
                  Sort by
                  <AccentButton disabled={sort==='-distance'} onClick={() => setSort('-distance')}>distance</AccentButton>
                  <AccentButton disabled={sort==='rating'} onClick={() => setSort('rating')}>rating</AccentButton>
                  Show
                  <AccentButton>open</AccentButton>
                  <AccentButton>nearby</AccentButton>
                </FlexCol>
              </Accent>
            </Main>
          )
        }
      </FlexCol>
    </Background>
  );
}

export default ShopsList;
