import React from 'react';
import styled from 'styled-components';
import { Accent, FlexRow } from '../Styled.jsx';
import thumbDown from '../../assets/thumbDown.svg';
import thumbUp from '../../assets/thumbUp.svg';

const Drink = styled(Accent)`
  // width: 40%;
`;

const Row = styled(FlexRow)`
  align-items: center;
`;

function DrinkItem({ arr }) {
  let drink = arr ? `${arr.name}` : '';
  return (
    <Drink>
      <Row>
        {drink}
        <img src={thumbDown} />
        {arr.rating}
        <img src={thumbUp} />
      </Row>
    </Drink>
  );
}

export default DrinkItem;
