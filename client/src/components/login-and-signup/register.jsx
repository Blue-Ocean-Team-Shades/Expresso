import React from 'react';
import styled from 'styled-components';
import { Container, Input, Button } from './login.jsx';

const Register = ({ logIn }) => {
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
          <Button>Sign up</Button>
        </div>
        <Login onClick={logIn}>Log in</Login>
      </div>
    </Container>
  )
}

const Login = styled.p`
  font-size: 20px;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export default Register;