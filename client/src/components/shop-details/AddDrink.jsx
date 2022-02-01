import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, FlexCol, AccentButton, FlexRow, Accent } from '../Styled.jsx';
import api from '../../api.js';

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

function AddDrink({ currentShop, setCurrentShop }) {
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

  // const addDrinkItem = () => {
  //   let obj = {
  //     place_id: 'ChIJr0p1HSe5QIYRJbI_fFPj6e0',
  //     drink_name: 'Late',
  //     recommend: true,
  //   };
  //   api.addDrink(obj)
  //     .then((result) => console.log(result))
  //     .catch((err) => console.log(err));
  // };

  const clickHandler = (event) => {
    event.preventDefault();
    // add drink to database --> /drinkmenu
    // // drink name , rating, placeid
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
