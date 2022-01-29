import React from 'react';
import styled from 'styled-components';
import {
  Background,
  Accent,
  Highlight,
  AccentButton,
  HighlightButton,
  Input,
  FlexRow,
  FlexCol,
} from '../Styled.jsx';

const GreenBackground = styled(Background)`
  background-color: green;
`;

const Row = styled(FlexRow)`
  flex-wrap: wrap;
  width: 100%;
`;

const Column = styled(FlexCol)`
  flex-basis: 100%;
  flex: 1;
`;

const OrangeColumn = styled(FlexCol)`
  background-color: orange;
  height: 100px;
`;

const BlueColumn = styled(FlexCol)`
  background-color: blue;
  height: 100px;
`;

const RedColumn = styled(FlexCol)`
  background-color: Red;
  height: 100px;
`;

let array = [
  'Row 1, Column One',
  'Row 1, Column Two',
  'Row 1, Column Three',
  'Row 2, Column One',
  'Row 2, Column Two',
  'Row 2, Column Three',
  'Row 3, Column One',
  'Row 3, Column Two',
  'Row 3, Column Three',
  'Row 4, Column One',
  'Row 4, Column Two',
];

const createRows = (arr) => {
  let result = [];
  while (arr.length > 2) {
    result.push(
      <Row key={arr.length}>
        <Column>
          <OrangeColumn>
            <div>{arr[0]}</div>
          </OrangeColumn>
        </Column>
        <Column>
          <BlueColumn>
            <div>{arr[1]}</div>
          </BlueColumn>
        </Column>
        <Column>
          <RedColumn>
            <div>{arr[2]}</div>
          </RedColumn>
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
              <OrangeColumn>
                <div>{el}</div>
              </OrangeColumn>
            </Column>
          );
        })}
      </Row>
    );
  }
  return result;
};

let rows = createRows(array);

function DrinkList(props) {
  return <>{rows}</>;
}

export default DrinkList;
