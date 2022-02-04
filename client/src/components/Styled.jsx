import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'

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
  max-width: ${mobileWidth}px;
  position: relative;
  display: flex;
  @media screen and (max-width: ${mobileWidth}px) {
    width: 100%;
    left: 0;
    transform: none;
  }
`

export const colors = {
  main: '#974a42',
  mainDark: '#621c15',
  mainLight: '#fed',
  accent: '#a4cfcd',
  accentDark: '#6f9695',
  accentLight: '#d8fffa',
  highlight: '#ffd952',
  highlightDark: '#cc8800',
  highlightLight: '#fff4c8',
}

export const Background = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  flex: 1;
  background-color: ${colors.main}
`

//placeholder
export const Accent = styled.div`

`

//placeholder
export const Highlight = styled.div`
`

export const styleAccentButton = `
&& {
  border-radius: 4px;
  background-color: ${colors.accent};
  margin: 4px;
  color: black;
  :hover {
    background-color: ${colors.accentLight};
  }
  :disabled {
    background-color: ${colors.accentDark};
  }
`

export const AccentButton = styled(Button)`
  ${styleAccentButton}
`

export const styleHighlightButton = `
${styleAccentButton}
&&{
  background-color: ${colors.highlight};
  :hover {
    background-color: ${colors.highlightLight};
  }
  :disabled {
    background-color: ${colors.highlightDark};
  }
}
`

//placeholder
export const HighlightButton = styled(Button)`
  ${styleHighlightButton}
`

//placeholder
export const Input = styled(TextField)`
  margin: 2px;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`

