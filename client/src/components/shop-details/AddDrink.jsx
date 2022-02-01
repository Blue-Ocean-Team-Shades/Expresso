import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, FlexCol, AccentButton, FlexRow, Accent } from '../Styled.jsx';
import axios from 'axios';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Col = styled(FlexCol)`
  align-items: center;
  // justify-content: center;
`;

const Row = styled(FlexRow)`
  align-items: flex-end;
  width: -webkit-fill-available;
  justify-content: space-evenly;
`;

const DrinkInput = styled(Accent)`
  // width: 40%;
  font-size: 1.3rem;
`;

const DrinkName = styled(Input)`
  // background-color: #d1d1d1;
`;

// might add feature
const DrinkPrice = styled(Input)`
  // background-color: #d1d1d1;
`;

const Recommend = styled(Accent)`
  // background-color: #d1d1d1;
`;

const RecommendRow = styled(FlexRow)`
  // border-radius: 5px;
  // border: solid #c4c4c4 1px;
  justify-content: center;
  align-items: center;
`;

const RecommendLabel = styled(Accent)`
  // background-color: #d1d1d1;
  text-align: center;
`;

const AddDrinkButton = styled(AccentButton)`
  // background-color: white;
`;

let placeholder = `Don't see a drink here? Add it!`;

function AddDrink({ currentShop, setCurrentShop }) {
  const [drinkValue, setDrinkValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [alignment, setAlignment] = React.useState('yes');

  const handleToggle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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

  const addDrinkItem = () => {
    let obj = {
      place_id: 'ChIJr0p1HSe5QIYRJbI_fFPj6e0',
      drink_name: 'Iced Coffee',
      recommend: true,
    };

    axios
      .post('/drinkmenu', obj)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const getDrink = () => {
    // let obj = {
    //   place_id: 'ChIJr0p1HSe5QIYRJbI_fFPj6e0',
    // };

    let optionsConfig = {
      params: {
        place_id: 'ChIJr0p1HSe5QIYRJbI_fFPj6e0',
      },
    };

    axios
      .get('/drinkmenu', optionsConfig)
      .then((data) => console.log(data.data))
      .catch((err) => console.log(err));
  };

  const clickHandler = (event) => {
    event.preventDefault();
    // add drink to database --> /drinkmenu
    // // placeid, drink name, recommend
    // setCurrentShop
    // // use current shop place id
    // // get current shop info from database
    // // setcurrentshop
    // addDrinkItem();
    // options.body{obj}

    getDrink();
    resetInputFields();
  };

  return (
    <Col>
      <DrinkInput>{placeholder}</DrinkInput>
      <Row>
        <FlexCol>
          <RecommendRow>
            <DrinkName
              placeholder='Drink Name'
              value={drinkValue}
              onChange={handleDrinkInput}
            />
          </RecommendRow>
        </FlexCol>

        <FlexCol>
          <RecommendLabel>Recommend?</RecommendLabel>
          <RecommendRow>
            <ToggleButtonGroup
              color='primary'
              value={alignment}
              exclusive
              onChange={handleToggle}
            >
              <ToggleButton value='yes'>Yes</ToggleButton>
              <ToggleButton value='no'>No</ToggleButton>
            </ToggleButtonGroup>
          </RecommendRow>
        </FlexCol>
        <AddDrinkButton onClick={clickHandler}>Add Drink</AddDrinkButton>
      </Row>
    </Col>
  );
}

export default AddDrink;

/* <DrinkName
          placeholder='Drink Name'
          value={drinkValue}
          onChange={handleDrinkInput}
        /> */
/* <AddDrinkButton onClick={clickHandler}>Add Drink</AddDrinkButton> */

/* <FlexCol>
          <label>Recommend?</label>
          <RecommendRow>
            <AddDrinkButton onClick={clickHandler}>Yes</AddDrinkButton>
            <AddDrinkButton onClick={clickHandler}>No</AddDrinkButton>
          </RecommendRow>
        </FlexCol> */

/*
 <DrinkPrice
          type='number'
          placeholder='Price'
          value={priceValue}
          onChange={handlePriceInput}
        />
*/
