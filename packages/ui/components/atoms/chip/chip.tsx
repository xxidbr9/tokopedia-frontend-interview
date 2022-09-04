import styled from '@emotion/styled'
import React from 'react'
import theme from 'ui/theme'

type ChipProps = {
  children?: React.ReactNode
}

const ChipInnerStyled = styled.span`
  font-family: 'Airbnb Cereal App';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${theme.colors.textPrimary};
` 

const ChipStyled = styled.span`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
  outline: none;
  border: none;
  padding: 2px 12px;
  background-color:${theme.colors.onSurface};
  border-radius: 12px;
  margin: 0;
  cursor: pointer;
`


const Chip: React.FC<ChipProps> = (props) => {
  return (
    <ChipStyled data-testid="chip">
      <ChipInnerStyled>{props.children}</ChipInnerStyled>
    </ChipStyled>
  )
}

export default Chip