import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Background,
  Accent,
  Highlight,
  AccentButton,
  HighlightButton,
  Input,
  FlexRow,
  FlexCol,
} from '../Styled.jsx';
import ShopInfo from './ShopInfo.jsx';
import DrinkList from './DrinkList.jsx';
import AddDrink from './AddDrink.jsx';
import api from '../../api.js';

// name
// formatted_address
// place_id
// real cafe info returnd by google places... used as dummy datta
let houstonCafe = {
  business_status: 'OPERATIONAL',
  formatted_address:
    '3201 Allen Pkwy Suite 170, Houston, TX 77019, United States',
  geometry: {
    location: {
      lat: 29.7600652,
      lng: -95.39919689999999,
    },
    viewport: {
      northeast: {
        lat: 29.76140937989272,
        lng: -95.39778912010726,
      },
      southwest: {
        lat: 29.75870972010728,
        lng: -95.40048877989271,
      },
    },
  },
  icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
  icon_background_color: '#FF9E67',
  icon_mask_base_uri:
    'https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet',
  name: 'BlendIn Coffee Club',
  opening_hours: {
    open_now: true,
  },
  photos: [
    {
      height: 1080,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/115468397199544586832">Antonio Gianola</a>',
      ],
      photo_reference:
        'Aap_uEDh0ENxMXVlmdxmdpM2VgWnLNpO-4NRJsOPmcK1cuPt7hlX0iBnbFUesraUTmkxCcoT5JCP5N4a0YViHkam6oG0dqKO4FvYfdk0JQGJ9DSY5O4y2_mpH84xYM7b55Rgg4YMFlHdPn7kcTjeHXyZtdsrGmMX_OUU1FyvXts_dIrtR8Xf',
      width: 1920,
    },
  ],
  place_id: 'ChIJHXAcSOLBQIYR-wYdO-W20zE',
  plus_code: {
    compound_code: 'QJ62+28 Montrose, Houston, TX',
    global_code: '76X6QJ62+28',
  },
  rating: 4.6,
  reference: 'ChIJHXAcSOLBQIYR-wYdO-W20zE',
  types: ['cafe', 'food', 'point_of_interest', 'store', 'establishment'],
  user_ratings_total: 92,
};

const ListBackground = styled(Background)`
  position: relative;
`;

const Column = styled(FlexCol)`
  flex-basis: 100%;
  flex: 1;
`;

const Container = styled(FlexRow)`
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 15vh;
  left: 50%;
  top: 0%;
  transform: translateX(-50%);
`;

const Inner = styled(FlexCol)`
  width: 60vw;
  height: 60vh;
  // max-height: 50vh;
  // height: 1200px;
  background-color: white;
  border: gray solid 1px;
  border-radius: 8px;
`;

const Image = styled(Accent)`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://picsum.photos/300/200');
  height: 40vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

function ShopDetails({ currentShop, setCurrentShop, shops, setShops }) {
  // sample getting shop drinks from test google places shop
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    getDrinks();
  }, []);

  const getDrinks = () => {
    api.getDrinks(currentShop.place_id)
      .then(({ data }) => {
        currentShop.drinks = data
        setShops(shops.slice())
      })
      .catch((err) => console.log(err, '<<<<<<<'));
  };

  return (
    <ListBackground>
      <Image />
      <Container>
        <Inner>
          <ShopInfo shop={currentShop || {}} />
          {/* <DrinkList drinks={drinks ? shop.drinks : []} /> */}
          <DrinkList
            drinks={currentShop.drinks || []}
            getDrinks={getDrinks}
            placeId={currentShop.place_id}
          />
          <AddDrink
            currentShop={currentShop}
            setCurrentShop={setCurrentShop}
            getDrinks={getDrinks}
            placeId={currentShop.place_id}
          />
        </Inner>
      </Container>
    </ListBackground>
  );
}

export default ShopDetails;
