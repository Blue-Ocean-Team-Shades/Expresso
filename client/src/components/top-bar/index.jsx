import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Options from './Options.jsx';
import styled from 'styled-components';
import { Button, Collapse, FormControl } from '@mui/material';
import logo from '../../assets/logo.svg';
import { Input, colors, HighlightButton } from '../Styled.jsx';

const FillSpace = styled.div`
  flex: 1;
`;

const LogoButton = styled(HighlightButton)`
  && {
    aspect-ratio: 1 / 2;
    position: relative;
    height: 2rem;
    width: 2rem;
    min-width: 0;
    min-height: 0;
    transform: scale(2.2);
    transform-origin: top left;
    margin: 4px;
    border-radius: 50%;
    box-shadow: 0 0px 3px #0003, 0 1px 2px #0003;
  }
  & img {
    height: 100%;
    width: auto;
    margin: 0;
  }
`;

const TitleBar = styled.div`
  display: flex;
  background-color: #fed;
  z-index: 100;
`;

const OverlayCollapse = styled(Collapse)`
  position: absolute;
  left: 0;
  top: 100%;
  background-color: ${colors.mainLight}
`

function TopBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [focused, setFocused] = useState(undefined);

  return (
    <TitleBar>
      <LogoButton onClick={() => navigate('/')} disableRipple={true}>
        <img src={logo} />
      </LogoButton>
      <FillSpace />
      <form>
        <FormControl onFocus={(e) => setFocused(e.target)} onBlur={() => setFocused(undefined)}>
          <Input label='search for' size='small' style={{ zIndex: 10 }} />
          <OverlayCollapse in={focused}>
            <Input label='at location' placeholder='near me' size='small' style={{ zIndex: 10 }} />
          </OverlayCollapse>
        </FormControl>
      </form>
      <Options />
    </TitleBar>
  );
}

export default TopBar;
