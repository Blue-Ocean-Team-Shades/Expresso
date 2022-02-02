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

const Anchor = styled(Accent)`
  text-align: center;
`;

function ShopInfo({ shop }) {
  let address = '928 Fulton St Suite A, Houston, TX 77009, United States';
  let url = `https://www.google.com/maps/dir/?api=1&destination=${shop.formatted_address}&dir_action=navigate`;
  return (
    <FlexRow>
      <Column>
        <Link to='/'>
          <img src={backArrow} />
        </Link>
      </Column>
      <Column>
        <Text>{shop.name}</Text>
        <Text>{shop.formatted_address}</Text>
      </Column>
      <Column>
        <Map>
          <Anchor as='a' href={url} target='_blank'>
            <img src={map} />
          </Anchor>
        </Map>
      </Column>
    </FlexRow>
  );
}

export default ShopInfo;
