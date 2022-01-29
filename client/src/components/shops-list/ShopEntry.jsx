import React from 'react';
import styled from 'styled-components';
import { Background, Accent, Highlight, FlexRow, FlexCol, AccentButton } from '../Styled.jsx';
import { useNavigate } from 'react-router-dom'

function ShopEntry ({shop, setCurrentShop}) {
  const navigate = useNavigate()
  function viewShop() {
    setCurrentShop(shop)
    navigate(`/details`)
  }

  return (
    <Accent>
      <AccentButton onClick={() => viewShop(shop)}>
        {shop.name} {'  |  '} Rating: {shop.rating}
      </AccentButton>
    </Accent>
  )
}

export default ShopEntry;
