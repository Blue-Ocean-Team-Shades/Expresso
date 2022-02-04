import React from 'react';
import styled from 'styled-components';
import { Container, Input, Button } from './login.jsx';

const Register = ({ logIn, signUp, signUpName, signUpPassword, confirmPassword, signUpUsernameErr }) => {
  return (
    <Container>
      <div>
        <InputArea>
          {signUpUsernameErr === false && <Input className='signUpUser' label='username' type="text" onChange={signUpName}></Input>}
          {signUpUsernameErr === true && <Input error className='signUpUser' label='username' type="text" onChange={signUpName} helperText='username already exist'></Input>}
        </InputArea>
        <InputArea>
          <Input className='signUpPassword' label='password' type="password" onChange={signUpPassword}></Input>
        </InputArea>
        <InputArea>
          <Input label='Confirm password' type="password" onChange={confirmPassword}></Input>
        </InputArea>
        <div>
          <Button onClick={signUp}>Sign up</Button>
        </div>
        <Login onClick={logIn}>Log in</Login>
      </div>
    </Container>
  )
}

const InputArea = styled.div`
  margin: 3% 5% 0% 5%;
`;

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