import React from 'react';
import TopBar from '../top-bar';
import styled from 'styled-components'
import { Background, Accent, Highlight } from '../Styled.jsx'

function ShopsList({ isFavorites }) {

  if (isFavorites) {
    return (
      <Background>
          My Favorites stuff
      </Background>
    );
  } else {
    return (
      <Background>
        Shops list stuff
      </Background>
    );
  }
}

export default ShopsList;
