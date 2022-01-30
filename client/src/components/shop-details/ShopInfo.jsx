import React from 'react';
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

const Column = styled(FlexCol)`
  flex-basis: 100%;
  flex: 1;
`;

function ShopInfo({ shop }) {
  return (
    <FlexRow>
      {console.log(shop)}
      <Column>
        <div>Back Home</div>
      </Column>
      <Column>
        <div>{shop.name}</div>
        <div>Address</div>
        <div>Website</div>
      </Column>
      <Column>
        <div>Show on Map</div>
      </Column>
    </FlexRow>
  );
}

export default ShopInfo;
