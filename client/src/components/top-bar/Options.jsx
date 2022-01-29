import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexRow } from '../Styled.jsx';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MenuStyled = styled(Menu)`
  & .MuiPaper-root {
    background-color: red;
  }
`;

const ButtonStyled = styled(Button)`
  border: 1px solid black;
  background-color: green;
  ${
    ({open}) => {
      if (open) return`
        background-color: red;
      `
      return ''
    }
  }
`

function Options(props) {
  const [anchorEl, setAnchor] = useState(null);
  const open = Boolean(anchorEl);
  function handleClose() {
    setAnchor(null);
  }

  return (
    <div>
      <ButtonStyled onClick={(e) => setAnchor(e.target)} open={open}>V</ButtonStyled>
      <MenuStyled
        open={open}
        id='settings'
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleClose}> Item 1</MenuItem>
        <MenuItem onClick={handleClose}> Item 2</MenuItem>
      </MenuStyled>
    </div>
  );
}

export default Options;
