import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Input,
  FlexCol,
  AccentButton,
  FlexRow,
  Accent,
  colors,
} from '../Styled.jsx';
import api from '../../api.js';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

const RecommendSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#621c15',
    '&:hover': {
      backgroundColor: '#621c154a',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#621c15',
  },
}));

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
  font-size: 1.5rem;
  margin-bottom: 2vh;
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
  && {
    background-color: ${colors.mainDark};
    color: white;
    &:hover {
      background-color: ${colors.main};
    }
  }
`;

const AddNewDrinkButton = styled(AccentButton)`
  && {
    background-color: ${colors.mainDark};
    color: white;
    font-size: 1.2rem;
    padding: 10px 20px;
    border-radius: 13px;
    &:hover {
      background-color: ${colors.main};
    }
    @media (max-width: 768px) {
      // position: fixed;
      // bottom: -4px;
      padding: 10px 15px;
      font-size: 1.2rem;
    }
  }
`;

const Form = styled.form`
  width: -webkit-fill-available;
`;

let placeholder = `Don't see a drink here? Add it!`;

function AddDrink({
  currentShop,
  setCurrentShop,
  setDrinks,
  getDrinks,
  placeId,
  isLoggedIn,
}) {
  const [drinkValue, setDrinkValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [recommend, seRecommend] = React.useState(true);
  const [isNewDrink, setIsNewDrink] = React.useState(true);
  const [isAddDrink, setIsAddDrink] = React.useState(false);

  const handleToggle = (event, newRecommend) => {
    seRecommend(newRecommend);
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
    seRecommend(true);
  };

  const addDrinkItem = (id) => {
    let obj = {
      place_id: currentShop.place_id,
      drink_name: drinkValue,
      recommend: recommend,
    };

    return api.addDrink(obj);
  };

  const clickHandler = (event) => {
    event.preventDefault();
    if (drinkValue !== '') {
      addDrinkItem(placeId)
        .then(() => getDrinks())
        .catch((err) => console.log(err));
      resetInputFields();
      setIsAddDrink(false);
      setIsNewDrink(true);
    }
  };

  const NewDrinkClickHandler = (event) => {
    event.preventDefault();
    setIsAddDrink(true);
    setIsNewDrink(false);
  };

  return !isLoggedIn() ? (
    ''
  ) : (
    <Col>
      {!isNewDrink ? (
        ''
      ) : (
        <AddNewDrinkButton type='button' onClick={NewDrinkClickHandler}>
          Add New Drink
        </AddNewDrinkButton>
      )}
      {!isAddDrink ? (
        ''
      ) : (
        <Form>
          <Row>
            <FlexCol>
              <RecommendRow>
                <DrinkName
                  required
                  placeholder='Drink Name'
                  value={drinkValue}
                  onChange={handleDrinkInput}
                  variant='standard'
                />
              </RecommendRow>
            </FlexCol>

            <FlexCol>
              <RecommendLabel>Recommend?</RecommendLabel>
              <RecommendRow>
                <RecommendSwitch
                  defaultChecked
                  value={recommend}
                  onChange={handleToggle}
                  color='primary'
                />
              </RecommendRow>
            </FlexCol>
            <AddDrinkButton type='submit' onClick={clickHandler}>
              Add Drink
            </AddDrinkButton>
          </Row>
        </Form>
      )}
    </Col>
  );
}

export default AddDrink;
