import React from 'react';
import styled from 'styled-components';
import { Container, Input, Button } from './login.jsx';

const Register = ({ logIn, signUp, signUpName, signUpPassword, confirmPassword }) => {
  return (
    <Container>
      <div>
        <div>
          <Input placeholder='Username' type="text" onChange={signUpName}></Input>
        </div>
        <div>
          <Input placeholder='Password' type="password" onChange={signUpPassword}></Input>
        </div>
        <div>
          <Input placeholder='Confirm password' type="password" onChange={confirmPassword}></Input>
        </div>
        <div>
          <Button onClick={signUp}>Sign up</Button>
        </div>
        <Login onClick={logIn}>Log in</Login>
      </div>
    </Container>
  )
}

const Login = styled.button`
  font-size: 20px;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export default Register;