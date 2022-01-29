import React, { useState } from 'react';
import styled from 'styled-components';
import {Background, Accent, Highlight} from '../Styled.jsx';
import { useNavigate } from "react-router-dom";

import Login from './login.jsx';
import Register from './register.jsx';
import axios from 'axios';

function LoginAndSignup({ isLogin, isSignup }) {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    navigate("/signup");
  }

  const logIn = () => {
    navigate("/login");
  }

  const usernameChange = (e) => {
    setUser(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  const submitLogin = () => {
    axios.post('/login', {
      username: user,
      password: password
    })
  }

  const submitSignUp = () => {
    axios.post('/signup', {
      username: user,
      password: password
    })
  }

  // const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }


  if (isLogin) {
    return (
      <Background>
        <Login
          usernameChange={usernameChange}
          passwordChange={passwordChange}
          submitLogin={submitLogin}
          signUp={signUp}
        />
      </Background>
    );
  } else if (isSignup) {
    return (
      <Background>
        <Register
          signUp={submitSignUp}
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
