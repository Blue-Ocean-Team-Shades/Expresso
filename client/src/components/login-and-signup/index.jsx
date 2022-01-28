import React from 'react';
import TopBar from '../top-bar';

function LoginAndSignup({ isLogin, isSignup }) {
  if (isLogin) {
    return (
      <div>
        <TopBar />
        Login stuff
      </div>
    );
  } else if (isSignup) {
    return (
      <div>
        <TopBar />
        Signup stuff
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
