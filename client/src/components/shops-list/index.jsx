import React from 'react';
import TopBar from '../top-bar';

function ShopsList({ isFavorites }) {

  if (isFavorites) {
    return (
      <div>
        <TopBar />
        My Favorites stuff
      </div>
    );
  } else {
    return (
      <div>
        <TopBar />
        Shops list stuff
      </div>
    );
  }
}

export default ShopsList;
