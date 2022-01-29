import React from 'react';
import styled from 'styled-components';
import { Input, FlexCol } from '../Styled.jsx';

const Row = styled(FlexCol)`
  align-items: center;
  justify-content: center;
`;

const DrinkInput = styled(Input)`
  background-color: red;
  width: 40%;
`;

let placeholder = `Don't see a drink here? Add it!`;

function AddDrink(props) {
  return (
    <Row>
      <DrinkInput type='text' name='name' placeholder={placeholder} />
    </Row>
  );
}

export default AddDrink;
