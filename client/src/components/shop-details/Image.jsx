import React, { useState } from 'react';
import styled from 'styled-components';
import { Background, FlexRow, FlexCol, Accent, colors } from '../Styled.jsx';

const ShopImage = styled(Accent)`
  height: 70vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    display: none;
  }
`;

function Image({ image }) {
  const styles = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url('${image || ''}')`,
  };

  return <ShopImage style={styles} />;
}

export default Image;
