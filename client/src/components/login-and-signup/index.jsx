import React from 'react';
import TopBar from '../top-bar';
import Login from './login.jsx';
import Register from './register.jsx';

function LoginAndSignup({ isLogin, isSignup }) {

  const signUp = () => {
    console.log('hello')
  }


  if (isLogin) {
    return (
      <div>
        <TopBar />
        <Login
          signUp={signUp}
        />
      </div>
    );
  } else if (isSignup) {
    return (
      <div>
        <TopBar />
        <Register />
      </div>
    );
  } else {
    return (
      <div>
        <TopBar />
        Whoops!
      </div>
    );
  }
}

export default LoginAndSignup;
