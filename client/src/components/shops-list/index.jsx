import React from 'react';
import TopBar from '../top-bar';
import styled from 'styled-components';
import { isMobile, Main, Background, Accent, Highlight, FlexRow, FlexCol, AccentButton } from '../Styled.jsx';
import ShopEntry from './ShopEntry.jsx';

const FitWidth = styled(Background)`
  display: flex;
  justify-content: center;
  width: 100%;
  border: 1px solid black;
  padding: 1em;
`;

const Shops = styled(Background)`
  display: flex;
  flex-direction: column;
`;

function ShopsList({ shops, isFavorites, setCurrentShop}) {
  return (
    <Background>
      {isFavorites ? 'TODO: filter by favorites' : null}
      <FlexCol>
        <FitWidth>
          <h1>Expresso</h1>
        </FitWidth>
        <Main>
          <Shops>
            {shops.map((shop) => (
              <ShopEntry shop={shop} key={shop.id} setCurrentShop={setCurrentShop} />
            ))}
          </Shops>
          <Accent>
            <FlexCol>
              Sort by
              <AccentButton>rating</AccentButton>
              <AccentButton>distance</AccentButton>
              Show
              <AccentButton>open</AccentButton>
              <AccentButton>nearby</AccentButton>
            </FlexCol>
          </Accent>
        </Main>
      </FlexCol>
    </Background>
  );
}

export default ShopsList;
