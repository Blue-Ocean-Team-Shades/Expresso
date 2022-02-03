import React, { useState } from 'react';
import styled from 'styled-components';
import { Background, FlexRow, FlexCol, Accent, colors } from '../Styled.jsx';

function Image({ image }) {
  const Image = styled(Accent)`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('${image || ''}');
  height: 70vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    display: none;
  }
`;

  return <Image />;
}

export default Image;
