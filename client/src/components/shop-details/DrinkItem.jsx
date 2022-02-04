import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Accent, FlexRow, FlexCol, colors } from '../Styled.jsx';
import thumbDown from '../../assets/thumbDown.svg';
import thumbUp from '../../assets/thumbUp.svg';
import thumbUpHover from '../../assets/thumbUpHover.svg';
import thumbDownHover from '../../assets/thumbDownHover.svg';

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

const DrinkName = styled(Accent)`
  font-size: 1.5rem;
  color: ${colors.mainLight};
`;

const Rating = styled(Accent)`
  font-size: 1rem;
`;

function DrinkItem({ arr, getDrinks, placeId, isLoggedIn }) {
  const [like, setLike] = useState(null);
  const [isLikeClicked, setLikeIsClicked] = useState(false);
  const [isDislikeClicked, setDislikeIsClicked] = useState(false);
  const [likeImg, setLikeImg] = useState(thumbUp);
  const [dislikeImg, setDislikeImg] = useState(thumbDown);

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

  const capitalize = (string) => {
    let result = [];
    let strArr = string.split(' ');
    strArr.map((word) =>
      result.push(word.charAt(0).toUpperCase() + word.slice(1))
    );
    return result.join(' ');
  };

  const onDislikeMouseOut = (event) => {
    setDislikeImg(thumbDown);
  };

  const onDislikeMouseIn = (event) => {
    setDislikeImg(thumbDownHover);
  };

  const onLikeMouseOut = (event) => {
    setLikeImg(thumbUp);
  };

  const onLikeMouseIn = (event) => {
    setLikeImg(thumbUpHover);
  };

  let drink = arr ? `${arr.drink_name}` : '';
  let thumbs = isLoggedIn() ? (
    <Row>
      <Img
        src={likeImg}
        onClick={!isLikeClicked ? likeClickHandler : null}
        onMouseOut={onLikeMouseOut}
        onMouseOver={onLikeMouseIn}
      />
      <Img
        src={dislikeImg}
        onClick={!isDislikeClicked ? dislikeClickHandler : null}
        onMouseOut={onDislikeMouseOut}
        onMouseOver={onDislikeMouseIn}
      />
    </Row>
  ) : (
    ''
  );

  return (
    <Drink>
      <Col>
        <DrinkName>{capitalize(drink)}</DrinkName>
        <Rating>Rating: {arr.drink_rating}</Rating>
        {thumbs}
      </Col>
    </Drink>
  );
}

export default DrinkItem;
