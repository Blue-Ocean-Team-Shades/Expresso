import React, { useState } from 'react';
import styled from 'styled-components';
import { Background, FlexRow, FlexCol, Accent } from '../Styled.jsx';
import DrinkItem from './DrinkItem.jsx';

const GreenBackground = styled(Background)`
  background-color: green;
`;

const Container = styled(Accent)`
  // height: 80vh;
  // min-height; 60vh;
  // max-height: 50vh;
  // background-color: purple;
  overflow: auto;
  height: inherit;
  border: gray solid 1px;
  // margin: 20px;
`;

const Row = styled(FlexRow)`
  flex-wrap: wrap;
  width: 100%;
`;

const Column = styled(FlexCol)`
  flex-basis: 100%;
  flex: 1;
`;

const InnerColumn = styled(FlexCol)`
  // background-color: orange;
  // height: 100px;
`;

const createRows = (arr) => {
  let result = [];
  while (arr.length > 2) {
    result.push(
      <Row key={arr.length}>
        <Column>
          <InnerColumn>
            <DrinkItem arr={arr[0]} />
          </InnerColumn>
        </Column>
        <Column>
          <InnerColumn>
            <DrinkItem arr={arr[1]} />
          </InnerColumn>
        </Column>
        <Column>
          <InnerColumn>
            <DrinkItem arr={arr[2]} />
          </InnerColumn>
        </Column>
      </Row>
    );
    arr.splice(0, 3);
  }
  if (arr.length > 0) {
    if (arr.length === 1) arr.push('', '');
    if (arr.length === 2) arr.push('');
    result.push(
      <Row key={arr.length}>
        {arr.map((el, i) => {
          return (
            <Column key={i}>
              <InnerColumn>
                <DrinkItem arr={arr[i]} />
              </InnerColumn>
            </Column>
          );
        })}
      </Row>
    );
  }
  return result;
};

// let rows = createRows(array);

function DrinkList({ drinks }) {
  let rows = createRows(drinks);

  return <Container>{rows}</Container>;
}

export default DrinkList;
