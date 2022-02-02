import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Accent, FlexRow, FlexCol } from '../Styled.jsx';
import thumbDown from '../../assets/thumbDown.svg';
import thumbUp from '../../assets/thumbUp.svg';
import api from '../../api.js';

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

    api
      .likeDrink(arr.id)
      .then(() => getDrinks())
      .catch((err) => console.log(err));
  };

  const dislikeClickHandler = () => {
    setDislikeIsClicked(true);
    setLikeIsClicked(false);

    api
      .dislikeDrink(arr.id)
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
