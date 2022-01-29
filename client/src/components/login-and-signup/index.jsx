import React from 'react';
import styled from 'styled-components';
import {Background, Accent, Highlight} from '../Styled.jsx';

function LoginAndSignup({ isLogin, isSignup }) {
  if (isLogin) {
    return (
      <Background>
        Login stuff
      </Background>
    );
  } else if (isSignup) {
    return (
      <Background>
        Signup stuff
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
