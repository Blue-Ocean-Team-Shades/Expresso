import React from 'react';
import styled from 'styled-components';
import { Background, Accent, Highlight, FlexRow, FlexCol, AccentButton } from '../Styled.jsx';

function ShopEntry ({shop}) {

  return (
    <Accent>
      {shop}
    </Accent>
  )
}

export default ShopEntry;
