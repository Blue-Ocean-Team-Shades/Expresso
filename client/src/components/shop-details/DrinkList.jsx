import React, { useState } from 'react';
import styled from 'styled-components';
import { Background, FlexRow, FlexCol, Accent, colors } from '../Styled.jsx';
import DrinkItem from './DrinkItem.jsx';

const GreenBackground = styled(Background)`
  background-color: green;
`;

const Container = styled(Accent)`
  // height: 80vh;
  // min-height; 60vh;
  // max-height: 50vh;
  overflow: auto;
  height: inherit;
  // border: gray solid 1px;
  margin: 2vw;
`;

// change flex direction to column  for mobile
// note: DrinkList Inner
// // //    width: 90vw;
// // //     height: 60vh;
const Row = styled(FlexRow)`
  flex-wrap: wrap;
  // width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: auto;
  }
`;

const Column = styled(FlexCol)`
  flex-basis: 100%;
  flex: 1;
  margin: 4px;
  border-radius: 5px;
  background-color: ${colors.mainDark};
  padding: 7px;
  color: white;
`;

const InnerColumn = styled(FlexCol)`
  // background-color: orange;
  // height: 100px;
`;

function DrinkList({ drinks, getDrinks, placeId }) {
  const createRows = (array) => {
    let arr = sortDrinks(array);
    let result = [];
    while (arr.length > 2) {
      result.push(
        <Row key={arr.length}>
          <Column>
            <InnerColumn>
              <DrinkItem arr={arr[0]} getDrinks={getDrinks} placeId={placeId} />
            </InnerColumn>
          </Column>
          <Column>
            <InnerColumn>
              <DrinkItem arr={arr[1]} getDrinks={getDrinks} placeId={placeId} />
            </InnerColumn>
          </Column>
          <Column>
            <InnerColumn>
              <DrinkItem arr={arr[2]} getDrinks={getDrinks} placeId={placeId} />
            </InnerColumn>
          </Column>
        </Row>
      );
      arr.splice(0, 3);
    }
    if (arr.length > 0) {
      result.push(
        <Row key={arr.length}>
          {arr.map((el, i) => {
            return (
              <Column key={i}>
                <InnerColumn>
                  <DrinkItem
                    arr={arr[i]}
                    getDrinks={getDrinks}
                    placeId={placeId}
                  />
                </InnerColumn>
              </Column>
            );
          })}
        </Row>
      );
    }
    return result;
  };

  const sortDrinks = (array) => {
    let result = [];
    let isSorted = false;
    while (!isSorted && array.length > 0) {
      isSorted = true;
      for (let i = 0; i < array.length; i++) {
        let drink = array[i];
        let rating = drink ? Number(drink.drink_rating) : undefined;
        let nextDrink = array[i + 1];
        let nextDrinkRating = nextDrink
          ? Number(nextDrink.drink_rating)
          : undefined;
        if (nextDrink && rating < nextDrinkRating) {
          isSorted = false;
          array[i] = nextDrink;
          array[i + 1] = drink;
        }
      }
    }
    return array;
  };

  let rows = createRows(drinks);
  return <Container>{rows}</Container>;
}

export default DrinkList;
