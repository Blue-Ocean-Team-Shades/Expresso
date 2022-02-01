import React, { useState } from 'react';
import styled from 'styled-components';
import { Accent, FlexRow, FlexCol } from '../Styled.jsx';
import thumbDown from '../../assets/thumbDown.svg';
import thumbUp from '../../assets/thumbUp.svg';
import axios from 'axios';

const Drink = styled(Accent)`
  // width: 40%;
`;

const Col = styled(FlexCol)`
  align-items: center;
`;

const Row = styled(FlexRow)`
  align-items: center;
`;

function DrinkItem({ arr }) {
  const [like, setLike] = useState(null);

  const likeClickHandler = () => {
    let obj = {
      drink_id: '2',
      rating: '1',
    };

    axios
      .post('/drinkrating', obj)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const dislikeClickHandler = () => {
    let obj = {
      drink_id: '2',
      rating: '0',
    };

    axios
      .post('/drinkrating', obj)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  let drink = arr ? `${arr.drink_name}` : '';
  return (
    <Drink>
      <Col>
        {drink}
        <div>rating: {arr.drink_rating}</div>
        <Row>
          <img src={thumbUp} onClick={likeClickHandler} />
          <img src={thumbDown} onClick={dislikeClickHandler} />
        </Row>
      </Col>
    </Drink>
  );
}

export default DrinkItem;
