import React from 'react';
import styled from 'styled-components';
import {Background, Accent, Highlight} from '../Styled.jsx';
import { useNavigate } from "react-router-dom";

import Login from './login.jsx';
import Register from './register.jsx';

function LoginAndSignup({ isLogin, isSignup }) {
  const navigate = useNavigate();

  const signUp = () => {
    navigate("/signup");
  }

  const logIn = () => {
    navigate("/login");
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
        <Register
          logIn={logIn}
        />
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
