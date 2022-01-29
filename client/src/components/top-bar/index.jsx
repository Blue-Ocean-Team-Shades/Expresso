import React from 'react';
import { Input } from '../Styled.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Options from './Options.jsx';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const FillSpace = styled.div`
  flex: 1;
`

const Logo = styled.img`
  width: 4em;
  height: 4em;
`

const TitleBar = styled.div`
  display: flex;
  background-color: #fed
`

function TopBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <TitleBar>
      <Button onClick={() => navigate('/')}>
        <Logo/>
      </Button>
      <FillSpace />
      <Input label='search'/>
      <Options />
    </TitleBar>
  );
}

export default TopBar;
