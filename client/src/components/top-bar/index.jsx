import React from 'react';
import { FlexRow } from '../Styled.jsx';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import Options from './Options.jsx';

function TopBar(props) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <FlexRow>
      Temporary nav bar:
      {location.pathname === '/' ? 'Shops list' : <Link to='/'>Shops list</Link>} &nbsp;|&nbsp;
      {location.pathname === '/details' ? (
        'Shop Details'
      ) : (
        <Link to='/details'>Shop details</Link>
      )}{' '}
      &nbsp;|&nbsp;
      {location.pathname === '/login' ? 'Login' : <Link to='/login'>Login</Link>} &nbsp;|&nbsp;
      {location.pathname === '/signup' ? 'Signup' : <Link to='/signup'>Signup</Link>} &nbsp;|&nbsp;
      {location.pathname === '/favorites' ? (
        'My Favorites'
      ) : (
        <Link to='/favorites'>My Favorites</Link>
      )}
      <Options />
    </FlexRow>
  );
}

export default TopBar;
