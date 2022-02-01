import React from 'react';
import { Input } from '../Styled.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Options from './Options.jsx';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import logo from '../../assets/logo.svg';
import { colors, HighlightButton } from '../Styled.jsx';

const FillSpace = styled.div`
  flex: 1;
`;

const LogoButton = styled(HighlightButton)`
  && {
    position: relative;
    height: 4em;
    width: 4em;
    transform: scale(1.2);
    transform-origin: top left;
    margin: 4px;
    border-radius: 50%;
    box-shadow:
                0 0px 3px #0003,
                0 1px 2px #0003;
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

function TopBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <TitleBar>
      <LogoButton onClick={() => navigate('/')} disableRipple={true} >
        <img src={logo} />
      </LogoButton>
      <FillSpace />
      <Input label='search' />
      <Options />
    </TitleBar>
  );
}

export default TopBar;
