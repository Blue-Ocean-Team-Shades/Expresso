import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FlexRow, FlexCol, colors, AccentButton, styleAccentButton } from '../Styled.jsx';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '@mui/material/Collapse';
import hamburger from '../../assets/hamburger.svg';
import hamburgerOpen from '../../assets/hamburgerOpen.svg';
import IconButton from '@mui/material/IconButton';
import api from '../../api.js';

const MenuStyled = styled(Menu)`
  && {
    .MuiList-padding {
      padding: 0;
    }
    .MuiPaper-root {
      background-color: lightgrey;
      border-top-right-radius: 0;
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
      setAnchorEl(e.currentTarget);
      const rect = e.currentTarget.getBoundingClientRect();
      setFixRight(window.innerWidth - rect.right);
      setAnchorWidth(e.currentTarget.offsetWidth);
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

  return (
    <div style={{ margin: 0 }}>
      <ButtonClosed onClick={setAnchor} disableRipple={true} size='small' open={open}>
        {open ? <ButtonImg src={hamburgerOpen} /> : <ButtonImg src={hamburger} />}
      </ButtonClosed>
      <MenuStyled
        open={open}
        id='settings'
        onClose={handleClose}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        disableScrollLock={true}
        PaperProps={{
          style: {
            right: `${fixRight}px`,
          },
        }}
        //TODO: fix menu breaks on window resize
      >
        <FlexRow>
          <FlexCol style={{ margin: '4px', flex: 1 }}>
            {isLoggedIn() ? (
              <div style={{ textAlign: 'center' }}>Welcome, {cookies.username}!</div>
            ) : null}
            <MenuItem onClick={() => goToPage('/favorites/')}>My Favorites</MenuItem>
            <EmptySpace />
            {isLoggedIn() ? (
              <MenuRight onClick={logOut}>Log Out</MenuRight>
            ) : (
              <MenuRight onClick={() => goToPage('/login')}>Log in</MenuRight>
            )}
          </FlexCol>
          <MenuSide as='div' width={anchorWidth}></MenuSide>
        </FlexRow>
      </MenuStyled>
    </div>
  );
}

export default Options;
