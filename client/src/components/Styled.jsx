import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

/**
 * To use these as something other than a div, use the `as` prop:
 * <Accent
 *   as='input'
 *   type='email'
 *   placeholder='enter email'
 *   ...etc
 * />
 */


export const mobileWidth = 768;

export function isMobile () {
  return window.screen.width < mobileWidth;
}

export const Main = styled.div`
  width: ${mobileWidth}px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  @media screen and (max-width: ${mobileWidth}px) {
    width: 100%;
    left: 0;
    transform: none;
  }
`


export const Background = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
`

//placeholder
export const Accent = styled.div`
`

//placeholder
export const Highlight = styled.div`
`

//placeholder
export const AccentButton = styled(Button)`

`

//placeholder
export const HighlightButton = styled(Button)`

`

//placeholder
export const Input = styled.input`

`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`

