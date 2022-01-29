import React from 'react';
import styled from 'styled-components';
import { Background, Accent, Highlight, FlexRow, FlexCol, AccentButton } from '../Styled.jsx';
import { useNavigate } from 'react-router-dom'

function ShopEntry ({shop}) {
  const navigate = useNavigate()
  function viewShop() {
    navigate(`/details?shop_id=${shop.id}`)
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
