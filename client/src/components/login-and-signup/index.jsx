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
  const [password, setPassword] = useState();
  const [signUpUser, setSignUpUser] = useState('');
  const [signUpPassword, setSignUpPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

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

  const signUpName = (e) => {
    setSignUpUser(e.target.value)
  }

  const signUpPw = (e) => {
    setSignUpPassword(e.target.value)
    console.log(signUpPassword)
  }

  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    console.log(confirmPassword)
  }

  const submitLogin = () => {
    axios.post('/login', {
      username: user,
      password: password
    })
      .then((res) => {
        console.log('this is res', res);
        // navigate('/');
      })
      .catch((err) => {
        console.log('this is err', err);
      })
  }

  const submitSignUp = () => {
    if (signUpPassword === confirmPassword) {
      axios.post('/signup', {
        username: signUpUser,
        password: signUpPassword
      })
        .then((res) => {
          console.log('this is res', res);
          // navigate('/login');
        })
        .catch((err) => {
          console.log('this is err', err);
        })
    } else {
      alert('Password confirm was incorrect!');
      navigate('/signup');
    }
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
          signUpName={signUpName}
          signUpPassword={signUpPw}
          confirmPassword={confirmPasswordChange}
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
