import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Accent, FlexRow, FlexCol } from '../Styled.jsx';
import thumbDown from '../../assets/thumbDown.svg';
import thumbUp from '../../assets/thumbUp.svg';
import api from '../../api.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Drink = styled(Accent)`
  // width: 40%;
`;

const Col = styled(FlexCol)`
  align-items: center;
`;

const Row = styled(FlexRow)`
  align-items: center;
`;

const Img = styled.img`
  cursor: pointer;
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
    {/* <Card>
    <CardContent> */}
      <Col>
        {drink}
        <div>rating: {arr.drink_rating}</div>
        <Row>
          <Img
            src={thumbUp}
            onClick={!isLikeClicked ? likeClickHandler : null}
          />
          <Img
            src={thumbDown}
            onClick={!isDislikeClicked ? dislikeClickHandler : null}
          />
        </Row>
      </Col>
      {/* </CardContent> */}
      {/* // </Card> */}
    </Drink>
  );
}

export default DrinkItem;
