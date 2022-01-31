import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, FlexCol, AccentButton, FlexRow, Accent } from '../Styled.jsx';

const Row = styled(FlexCol)`
  align-items: center;
  justify-content: center;
`;

const DrinkInput = styled(Accent)`
  // width: 40%;
  font-size: 1.3rem;
`;

const DrinkName = styled(Input)`
  // background-color: #d1d1d1;
`;

const DrinkPrice = styled(Input)`
  // background-color: #d1d1d1;
`;

const AddDrinkButton = styled(AccentButton)`
  // background-color: white;
`;

let placeholder = `Don't see a drink here? Add it!`;

function AddDrink(props) {
  const [drinkValue, setDrinkValue] = useState('');
  const [priceValue, setPriceValue] = useState('');

  const handleDrinkInput = (e) => {
    setDrinkValue(e.target.value);
  };

  const handlePriceInput = (e) => {
    setPriceValue(e.target.value);
  };

  const resetInputFields = () => {
    setDrinkValue('');
    setPriceValue('');
  };

  const clickHandler = (event) => {
    event.preventDefault();
    // add drink to database
    // setCurrentShop
    // use current shop place id
    // get current shop info from database
    // setcurrentshop
    resetInputFields();
  };

  return (
    <Row>
      <DrinkInput>{placeholder}</DrinkInput>
      <FlexRow>
        <DrinkName
          placeholder='Drink Name'
          value={drinkValue}
          onChange={handleDrinkInput}
        />
        <DrinkPrice
          type='number'
          placeholder='Price'
          value={priceValue}
          onChange={handlePriceInput}
        />
        <AddDrinkButton onClick={clickHandler}>Add Drink</AddDrinkButton>
      </FlexRow>
    </Row>
  );
}

export default AddDrink;
