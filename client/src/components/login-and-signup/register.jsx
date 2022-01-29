import React from 'react';
import styled from 'styled-components';
import { Container, Input, Button } from './login.jsx';

const Register = ({ logIn, signUp }) => {
  return (
    <Container>
      <div>
        <div>
          <Input placeholder='Username'></Input>
        </div>
        <div>
          <Input placeholder='Email'></Input>
        </div>
        <div>
          <Input placeholder='Password'></Input>
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