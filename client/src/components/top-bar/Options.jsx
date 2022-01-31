import React, { useState, useRef, useCallback, useEffect } from 'react';
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

const ButtonOpen = styled(ButtonClosed)`
  && {
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
  const [offset, setOffset] = useState(16);
  const anchorRef = useRef();
  const navigate = useNavigate();
  function handleClose() {
    setAnchor(null);
  }

  function setAnchor(e) {
    if (e) {
      setAnchorEl(e.currentTarget);
      const newOffs = e.currentTarget.offsetWidth - e.currentTarget.children[0].offsetWidth;
      setOffset(newOffs);
      console.log(newOffs);
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
    <div>
      <ButtonClosed
        onClick={setAnchor}
        disableRipple={true}
        ref={anchorRef}
        size='medium'
        open={open}
      >
        {open ? <ButtonImg src={hamburgerOpen} /> : <ButtonImg src={hamburger} />}
      </ButtonClosed>
      <MenuStyled
        open={open}
        id='settings'
        onClose={handleClose}
        anchorEl={anchorEl}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        offset={offset}
        PaperProps={{
          style: {
            transform: `translateX(${offset}px)`,
          },
        }}
      >
        <FlexRow>
          <FlexCol style={{ margin: '4px' }}>
            <MenuItem onClick={() => goToPage('/favorites/')}>My Favorites</MenuItem>
            <EmptySpace />
            <MenuRight onClick={() => goToPage('/login')}>Log in</MenuRight>
          </FlexCol>
          <ButtonOpen as='div' width={anchorWidth}></ButtonOpen>
        </FlexRow>
      </MenuStyled>
    </div>
  );
}

export default Options;
