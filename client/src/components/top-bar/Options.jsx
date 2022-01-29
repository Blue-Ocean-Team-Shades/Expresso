import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { FlexRow } from '../Styled.jsx';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MenuStyled = styled(Menu)`
  & .MuiPaper-root {
    background-color: grey;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
`;

const ButtonStyled = styled(Button)`
  background-color: brown;
  color: black;
  height: 2rem;
  :hover {
    background-color: red;
  }
  ${({ open, height }) => {
    if (open)
      return `
        height: calc(${height}px + 2rem);
        border-bottom-left-radius: 0;
        box-shadow:
          -1px 2px 1px 0px rgb(0 0 0 / 20%),
          0px 1px 1px 0px rgb(0 0 0 / 14%),
          0px 1px 3px 0px rgb(0 0 0 / 12%);
      `;
    return '';
  }}
`;

function callbackRef(setHeight) {
  const ref = useRef();
  const setRef = useCallback((node) => {
    if (ref.current) {
      //cleanup old events
    }
    if (node) {
      setHeight(node.children[2].clientHeight);
      console.log(node.children[2].clientHeight);
    }
    ref.current = node;
  }, []);
  return setRef;
}

function Options(props) {
  const [anchorEl, setAnchor] = useState(null);
  const [height, setHeight] = useState(0);
  const open = Boolean(anchorEl);
  const ref = callbackRef(setHeight);
  function handleClose() {
    setAnchor(null);
  }

  return (
    <div>
      <ButtonStyled
        onClick={(e) => setAnchor(e.target)}
        open={open}
        height={height}
        disableRipple={true}
      >
        V
      </ButtonStyled>
      <MenuStyled
        open={open}
        id='settings'
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        ref={ref}
      >
        <MenuItem onClick={handleClose}> Item 1</MenuItem>
        <MenuItem onClick={handleClose}> Item 2</MenuItem>
      </MenuStyled>
    </div>
  );
}

export default Options;
