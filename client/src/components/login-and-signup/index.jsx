import React from 'react';
import Login from './login.jsx';
import Register from './register.jsx';
import styled from 'styled-components';
import {Background, Accent, Highlight} from '../Styled.jsx';

function LoginAndSignup({ isLogin, isSignup }) {

  const signUp = () => {
    console.log('hello')
  }


  if (isLogin) {
    return (
      <Background>
        <Login
          signUp={signUp}
        />
      </Background>
    );
  } else if (isSignup) {
    return (
      <Background>
        <Register />
      </Background>
    );
  } else {
    return (
      <Background>
        Whoops!
      </Background>
    );
  }
}

export default LoginAndSignup;
