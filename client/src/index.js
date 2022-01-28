import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopsList from './components/shops-list';
import LoginSignup from './components/shops-list';
import ShopDetails from './components/shops-list';

render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<ShopsList />} />
      <Route path='/details' element={<ShopDetails />} />
      <Route path='/login' element={<LoginSignup isLogin={true} />} />
      <Route path='/signup' element={<LoginSignup isSignup={true} />} />
      <Route path='/favorites' element={<ShopsList isFavorites={true}/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
