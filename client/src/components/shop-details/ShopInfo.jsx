import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import map from '../../assets/map.svg';
import backArrow from '../../assets/backArrow.svg';

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
  justify-content: center;
`;

const Text = styled(Accent)`
  text-align: center;
`;

const Website = styled(Accent)`
  text-align: center;
`;

const Map = styled(Accent)`
  text-align: right;
`;

function ShopInfo({ shop }) {
  return (
    <FlexRow>
      <Column>
        <Link to='/'>
          <img src={backArrow} />
        </Link>
      </Column>
      <Column>
        <Text>{shop.name}</Text>
        <Text>201 Octavia St, San Francisco, CA 94102</Text>
        <Website as='a' href='http://www.mercurycafe.net/'>
          mercurycafe.net
        </Website>
      </Column>
      <Column>
        <Map>
          <Link to='/'>
            <img src={map} />
          </Link>
        </Map>
      </Column>
    </FlexRow>
  );
}

export default ShopInfo;
