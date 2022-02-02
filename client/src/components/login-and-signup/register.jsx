import React from 'react';
import styled from 'styled-components';
import { Container, Input, Button } from './login.jsx';

const Register = ({ logIn, signUp, signUpName, signUpPassword, confirmPassword, signUpUsernameErr }) => {
  return (
    <Container>
      <div>
        <div>
          <Input className='signUpUser' placeholder='Username' type="text" onChange={signUpName}></Input>
          {signUpUsernameErr === true && <p>Username already exists</p>}
        </div>
        <div>
          <Input className='signUpPassword' placeholder='Password' type="password" onChange={signUpPassword}></Input>
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

const Login = styled.p`
  font-size: 20px;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
`;

export default Register;