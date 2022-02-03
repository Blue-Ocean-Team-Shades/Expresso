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
    position: relative;
    height: 2rem;
    width: 2rem;
    min-width: 0;
    min-height: 0;
    transform: scale(2.2) translate(0.15rem, 0.15rem);
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
  background-color: ${colors.mainLight};
  z-index: 100;
`;

const OverlayCollapse = styled(Collapse)`
  position: absolute;
  left: 0;
  top: 100%;
  background-color: ${colors.mainLight};
  border-radius: 0 0 4px 4px;
`;

function TopBar({
  searchTerm,
  setSearchTerm,
  searchLocation,
  setSearchLocation,
  submitSearch,
  cookies,
  updateCookies,
  isLoggedIn,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [focused, setFocused] = useState(undefined);

  function handleSubmit(e) {
    e.preventDefault();
    submitSearch();
  }

  function goHome() {
    setSearchTerm('')
    navigate('/')
  }

  return (
    <TitleBar>
      <LogoButton onClick={goHome} disableRipple={true}>
        <img src={logo} />
      </LogoButton>
      <FillSpace />
      <form onSubmit={handleSubmit}>
        <FormControl onFocus={(e) => setFocused(e.target)} onBlur={() => setFocused(undefined)}>
          <Input
            label='search for'
            placeholder='coffee'
            size='small'
            style={{ zIndex: 10 }}
            value={searchTerm}
            autoComplete='off'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <OverlayCollapse in={!!focused}>
            <Input
              label='at location'
              placeholder='near me'
              size='small'
              style={{ zIndex: 10 }}
              value={searchLocation}
              autoComplete='off'
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <HighlightButton type='submit' fullWidth style={{ margin: 0 }}>
              search
            </HighlightButton>
          </OverlayCollapse>
        </FormControl>
      </form>
      <Options cookies={cookies} updateCookies={updateCookies} isLoggedIn={isLoggedIn} setSearchTerm={setSearchTerm} />
    </TitleBar>
  );
}

export default TopBar;
