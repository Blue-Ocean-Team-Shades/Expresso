import React from 'react';
import styled from 'styled-components';
import { Accent } from '../Styled.jsx';

const Drink = styled(Accent)`
  // width: 40%;
`;

function DrinkItem({ arr }) {
  let drink = arr ? `${arr.name} - $${arr.price} - ${arr.rating}` : '';
  return <Drink>{drink}</Drink>;
}

export default DrinkItem;
