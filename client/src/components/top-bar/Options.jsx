import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FlexRow, FlexCol, colors, AccentButton, styleAccentButton } from '../Styled.jsx';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import { MenuItem, Collapse, IconButton, Switch } from '@mui/material/';
import hamburger from '../../assets/hamburger.svg';
import hamburgerOpen from '../../assets/hamburgerOpen.svg';
import api from '../../api.js';

const MenuStyled = styled(Menu)`
  && {
    .MuiList-padding {
      padding: 0;
    }
    .MuiPaper-root {
      background-color: lightgrey;
      border-top-right-radius: 0;
      right: ${({fixright}) => fixright}px;
      left: ${({fixright}) => window.innerWidth - fixright - 250}px !important;
    }
  }
`;

const ButtonImg = styled.img`
  width: 1.2em;
  height: auto;
`;

const ButtonClosed = styled(IconButton)`
  ${styleAccentButton}
  ${({ open }) =>
    open
      ? `
        && {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          }
      `
      : ''}
`;

const MenuSide = styled(AccentButton)`
  && {
    pointer-events: none;
    margin: 0;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 0;
    width: ${({ width }) => width}px;
  }
`;

const MenuRight = styled(MenuItem)`
  && {
    justify-content: flex-end;
  }
`;
const EmptySpace = styled.div`
  height: 8rem;
`;

function Options({ cookies, updateCookies, isLoggedIn }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorWidth, setAnchorWidth] = useState(64);
  const [fixRight, setFixRight] = useState(4);
  const navigate = useNavigate();

  const [menuWidth, setMenuWidth] = useState(0);

  function handleClose() {
    setAnchor(null);
  }

  function setAnchor(e) {
    if (e) {
      const target = e.currentTarget;
      // const target = e.currentTarget;
      setAnchorEl(target);
      const rect = target.getBoundingClientRect();
      setFixRight(window.innerWidth - rect.right);
      setAnchorWidth(target.offsetWidth);
    } else {
      setAnchorEl(null);
    }
  }

  function goToPage(page) {
    navigate(page);
    handleClose();
  }

  function logOut() {
    api.logOut(updateCookies);
  }

  function toggleDistanceUnits() {
    if (cookies.units_miles) {
      document.cookie = 'units_miles=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } else {
      document.cookie = 'units_miles=true; path=/';
    }
    updateCookies();
  }

  return (
    <div style={{ margin: 0 }}>
      <ButtonClosed onClick={setAnchor} disableRipple={true} size='small' open={open}>
        {open ? <ButtonImg src={hamburgerOpen} /> : <ButtonImg src={hamburger} />}
      </ButtonClosed>
      <MenuStyled
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        disableScrollLock={true}
        fixright={fixRight}
      >
        <FlexRow>
          <FlexCol style={{ margin: '4px', flex: 1 }}>
            {isLoggedIn() ? (
              <div style={{ textAlign: 'center' }}>Welcome, {cookies.username}!</div>
            ) : null}
            <MenuItem onClick={() => goToPage('/favorites/')}>My Favorites</MenuItem>
            <FlexRow>
              <label htmlFor='toggleDistanceUnits'>Miles</label>
              <Switch
                id='toggleDistanceUnits'
                checked={!!cookies.units_miles}
                onChange={toggleDistanceUnits}
              />
            </FlexRow>
            <EmptySpace />
          </FlexCol>
          <MenuSide as='div' width={anchorWidth}></MenuSide>
        </FlexRow>
        {isLoggedIn() ? (
          <MenuRight onClick={logOut}>Log Out</MenuRight>
        ) : (
          <MenuRight onClick={() => goToPage('/login')}>Log in</MenuRight>
        )}
      </MenuStyled>
    </div>
  );
}

export default Options;
