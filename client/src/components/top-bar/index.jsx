import React from 'react';
import { FlexRow } from '../Styled.jsx'
import { Link } from 'react-router-dom';

function TopBar (props) {
  return (
    <FlexRow>
      <Link to='/index'>Shops list</Link>
      <Link to='/details'>Shop details</Link>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
      <Link to='/favorites'>My Favorites</Link>
    </FlexRow>
  )
}

export default TopBar;
