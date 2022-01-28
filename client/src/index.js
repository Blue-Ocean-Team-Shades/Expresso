import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopsList from './components/shops-list';
import LoginSignup from './components/login-and-signup';
import ShopDetails from './components/shop-details';

render(
  <BrowserRouter>
    <Routes>
      <Route path='/index' element={<ShopsList />} />
      <Route path='/details' element={<ShopDetails isFavorites={false} />} />
      <Route path='/login' element={<LoginSignup isLogin={true} />} />
      <Route path='/signup' element={<LoginSignup isSignup={true}/>} />
      <Route path='/favorites' element={<ShopsList isFavorites={true}/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
