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
  width: 2em;
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

function Options(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorWidth, setAnchorWidth] = useState(64);
  const [offset, setOffset] = useState({ left: 0, top: 0 });
  const navigate = useNavigate();

  const [menuWidth, setMenuWidth] = useState(0);

  function handleClose() {
    setAnchor(null);
  }

  function setAnchor(e) {
    if (e) {
      setAnchorEl(e.currentTarget);
      const rect = e.currentTarget.getBoundingClientRect();
      setOffset({ left: rect.right, top: rect.bottom });
      setAnchorWidth(e.currentTarget.offsetWidth);
    } else {
      setAnchorEl(null);
    }
  }

  function goToPage(page) {
    navigate(page);
    handleClose();
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
      >
        <FlexRow>
          <FlexCol style={{ margin: '4px' }}>
            <MenuItem onClick={() => goToPage('/favorites/')}>My Favorites</MenuItem>
            <EmptySpace />
            <MenuRight onClick={() => goToPage('/login')}>Log in</MenuRight>
          </FlexCol>
          <MenuSide as='div' width={anchorWidth}></MenuSide>
        </FlexRow>
      </MenuStyled>
    </div>
  );
}

export default Options;
