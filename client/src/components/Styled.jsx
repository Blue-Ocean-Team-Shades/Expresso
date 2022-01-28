import React from 'react';
import styled from 'styled-components';

/**
 * To use these as something other than a div, use the `as` prop:
 * <Accent
 *   as='input'
 *   type='email'
 *   placeholder='enter email'
 *   ...etc
 * />
 */
export const Background = styled.div`
  background-color: brown;
  color: creme;
`

export const Accent = styled.div`
  background-color: mint;
  color: black;
`

export const Highlight = styled.div`
  background-color: gold;
  color: black;
`

export const AccentButton = styled.button`
  ${/*placeholder*/}
`

export const HighlightButton = styled.button`
  ${/*placeholder*/}
`

export const Input = styled.input `
  ${/*placeholder*/}
`
