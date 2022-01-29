import React from 'react';
import TopBar from '../top-bar';
import styled from 'styled-components';
import { Background, Accent, Highlight, FlexRow, FlexCol, AccentButton } from '../Styled.jsx';
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

const Content = styled(FlexRow)`
  max-width: 800px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 1vmin;
`

function ShopsList({ isFavorites }) {
  if (isFavorites) {
    return <Background>My Favorites stuff</Background>;
  } else {
    return (
      <Background>
        <FlexCol>
          <FitWidth>
            <h1>Expresso</h1>
          </FitWidth>
          <Content>
            <Shops>
              {['A', 'B', 'C'].map((shop) => (
                <ShopEntry shop={shop} key={shop} />
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
          </Content>
        </FlexCol>
      </Background>
    );
  }
}

export default ShopsList;
