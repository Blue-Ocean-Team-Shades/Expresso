import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { FlexRow } from '../Styled.jsx';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MenuStyled = styled(Menu)`
  & .MuiPaper-root {
    background-color: lightgrey;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
`;

const ButtonStyled = styled(Button)`
  background-color: brown;
  color: black;
  :hover {
    background-color: red;
  }
`;

const ButtonOpen = styled.div`
  border-radius: 4px;
  background-color: grey;
  transition-property: height;
  transition-duration: 250ms;
  border-bottom-left-radius: 0;
  box-shadow: -1px 1px 1px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ height }) => `${height}`}px;
  visibility: ${({ open }) => `${open ? 'visible' : 'hidden'}`};
`;

function callbackRef(setHeight, isMenu) {
  const ref = useRef();
  const setRef = useCallback((node) => {
    if (ref.current) {
      //cleanup old events
    }
    if (node) {
      if (isMenu) {
        setHeight(node.children[2].clientHeight);
      } else {
        setHeight(node.clientHeight);
      }
    }
    ref.current = node;
  }, []);
  return setRef;
}

function Options(props) {
  const [anchorEl, setAnchor] = useState(null);
  const [menuHeight, setMenuHeight] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);
  const open = Boolean(anchorEl);
  const buttonRef = callbackRef(setButtonHeight);
  const menuRef = callbackRef(setMenuHeight, true);
  // const
  function handleClose() {
    setAnchor(null);
  }

  return (
    <div>
      <ButtonStyled onClick={(e) => setAnchor(e.target)} disableRipple={true} ref={buttonRef}>
        V
        <ButtonOpen height={open ? menuHeight + buttonHeight : buttonHeight} open={open}>
          ^
        </ButtonOpen>
      </ButtonStyled>
      <MenuStyled
        open={open}
        id='settings'
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        ref={menuRef}
      >
        <MenuItem onClick={handleClose}> Item 1</MenuItem>
        <MenuItem onClick={handleClose}> Item 2</MenuItem>
      </MenuStyled>
    </div>
  );
}

export default Options;