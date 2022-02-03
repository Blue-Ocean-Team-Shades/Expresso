import React from 'react';
import styled from 'styled-components';
import { colors } from '../Styled.jsx';
import TextField from '@mui/material/TextField';

const Login = ({ usernameChange, passwordChange, submitLogin, signUp, usernameErr, passwordErr }) => {
  return (
    <Container>
      <div>
        <InputArea>
          {usernameErr === false && <Input className='loginUser' fullWidth label='username' type="text" onChange={usernameChange}></Input>}
          {usernameErr === true && <Input error className='loginUser' fullWidth label='username' type="text" onChange={usernameChange} helperText='username not exist'></Input>}
        </InputArea>
        <InputArea>
          {passwordErr === false && <Input className='loginPassword' label='password' type="password" onChange={passwordChange}></Input>}
          {passwordErr === true && <Input error className='loginPassword' label='password' type="password" onChange={passwordChange} helperText='password is incorrect'></Input>}
        </InputArea>
        <div>
          <Button onClick={submitLogin}>Log in</Button>
        </div>
        <SignUp onClick={signUp}>Sign up</SignUp>
      </div>
    </Container>
  )
}

export const Container = styled.div`
  z-index: 200;
  position:fixed;
  text-align: center;
  background-color: ${colors.mainLight};
  width: 35%;
  height: 38%;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 80%;
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  @media screen and (max-width:900px) {
    width: 85%;
  }
`;

const InputArea = styled.div`
  margin: 3% 5% 0% 5%;
`;

export const Input = styled(TextField)`
  text-align: center;
  height: 50%;
  width: 50%;
`;

export const Button = styled.button`

  :hover {
    opacity: 0.8;
    background-color: #fff;
  }
  cursor: pointer;
  text-transform: uppercase;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fbeee0;
  border: 1px solid #422800;
  border-radius: 10px;
  color: #422800;
`;

const SignUp = styled.p`
  font-size: 20px;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
`;

export default Login;




