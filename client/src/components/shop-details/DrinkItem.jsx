import React, { useState, useRef } from 'react';
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

function DrinkItem({ arr, getDrinks, placeId }) {
  const [like, setLike] = useState(null);
  const [isLikeClicked, setLikeIsClicked] = useState(false);
  const [isDislikeClicked, setDislikeIsClicked] = useState(false);

  const likeClickHandler = () => {
    setLikeIsClicked(true);
    setDislikeIsClicked(false);

    let obj = {
      drink_id: arr.id,
      rating: '1',
    };

    axios
      .post('/ratedrink', obj)
      .then(() => getDrinks())
      .catch((err) => console.log(err));
  };

  const dislikeClickHandler = () => {
    setDislikeIsClicked(true);
    setLikeIsClicked(false);
    let obj = {
      drink_id: arr.id,
      rating: '0',
    };

    axios
      .post('/ratedrink', obj)
      .then(() => getDrinks())
      .catch((err) => console.log(err));
  };

  let drink = arr ? `${arr.drink_name}` : '';
  return (
    <Drink>
      <Col>
        {drink}
        <div>rating: {arr.drink_rating}</div>
        <Row>
          <img
            src={thumbUp}
            onClick={!isLikeClicked ? likeClickHandler : null}
          />
          <img
            src={thumbDown}
            onClick={!isDislikeClicked ? dislikeClickHandler : null}
          />
        </Row>
      </Col>
    </Drink>
  );
}

export default DrinkItem;
