import React from 'react';
import { FlexRow } from '../Styled.jsx'
import { Link } from 'react-router-dom';

function TopBar (props) {
  return (
    <FlexRow>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
      <Link to='/details'>Shop details</Link>
      <Link to='/'>Shops list</Link>
    </FlexRow>
  )
}

export default TopBar;
