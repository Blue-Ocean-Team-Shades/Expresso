import React, { useState } from 'react';
import styled from 'styled-components';
import { Background, Accent, Highlight } from '../Styled.jsx';
import { useNavigate } from "react-router-dom";
import { inputValidation } from "./inputValidation";

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
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [signUpUsernameErr, setSignUpUsernameErr] = useState(false);

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
  }

  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const submitLogin = () => {
    let formData = {
      username: user,
      password: password
    }

    let currentErrors = inputValidation(formData);

    if (currentErrors.length === 0) {
      axios.post('/login', formData)
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setUsernameErr(true);
            document.getElementsByClassName('loginUser')[0].style.border = '1px solid red';
          }
          if (err.response.status === 400) {
            setPasswordErr(true);
            document.getElementsByClassName('loginPassword')[0].style.border = '1px solid red';
          }
        })
    } else {
      alert(`${currentErrors[0]}`);
    }

  }

  const submitSignUp = () => {
    let formData = {
      username: signUpUser,
      password: signUpPassword
    }

    let currentErrors = inputValidation(formData);

    if (currentErrors.length === 0) {
      if (signUpPassword === confirmPassword) {
        axios.post('/signup', formData)
          .then(() => {
            navigate('/login');
          })
          .catch((err) => {
            if (err.response.status === 500) {
              setSignUpUsernameErr(true);
              document.getElementsByClassName('signUpUser')[0].style.border = '1px solid red';
            }
          })
      } else {
        alert('Confirm password was incorrect')
      }
    } else {
      alert(`${currentErrors[0]}`);
    }

  }

  if (isLogin) {
    return (
      <Background>
        <Login
          usernameChange={usernameChange}
          passwordChange={passwordChange}
          usernameErr={usernameErr}
          passwordErr={passwordErr}
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
          signUpUsernameErr={signUpUsernameErr}
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
