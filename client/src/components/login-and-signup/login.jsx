import React from 'react';
import styled from 'styled-components';

const Login = ({ signUp }) => {
  return (
    <Container>
      <div>
        <div>
          <Input placeholder='Username'></Input>
        </div>
        <div>
          <Input placeholder='Password'></Input>
        </div>
        <div>
          <Button>Log in</Button>
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
  background: white;
  width: 20%;
  height: 30%;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 80%;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

export const Input = styled.input`
  text-align: center;
  padding: 10px;
  border: 1px solid;
  margin: 10px 10px 10px 10px;
`

export const Button = styled.button`
  border: 0px;
  :hover {
    opacity: 0.8;
  }
  cursor: pointer;
  text-transform: uppercase;
  padding: 10px;
  margin-bottom: 20px;
`

const SignUp = styled.button`
  font-size: 20px;
  position: absolute;
  right: 0;
  bottom: 0;
`;



export default Login;