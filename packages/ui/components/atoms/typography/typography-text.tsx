import styled from '@emotion/styled'
import React from 'react'

type TextSizeType = 'xs' | 'sm' | 'md' | 'lg'
type TextWeightType = 'bold' | 'medium' | 'regular' | 'light'

export type TextProps = {
  as?: 'p' | 'span' | 'div'
  weight?: TextWeightType
  decoration?: 'underline' | 'line-through' | 'none'
  size?: TextSizeType
  isOverline?: boolean
  children?: React.ReactNode
}

const weightMap = {
  bold: 700,
  medium: 500,
  regular: 400,
  light: 300,
}

const fontSizeMap: { [key in TextSizeType]: string } = {
  xs: `
  font-size: 12px;
  line-height: 20px;
  `,
  sm: `
  font-size: 14px;
  line-height: 20px;
  `,
  md: `
  font-size: 16px;
  line-height: 24px;
  `,
  lg: `
  font-size: 18px;
  line-height: 28px;
  `,
}

const TextStyled = styled.p<TextProps>`
  font-family: 'Airbnb Cereal App';
  font-style: normal;
  font-weight: ${(props) => weightMap[props.weight as TextWeightType]};
  text-decoration: ${(props) => props.decoration};
  ${(props) => fontSizeMap[props.size as TextSizeType]}
  ${(props) => props.isOverline && `
  text-transform: uppercase; 
  font-size: 14px; 
  line-height: 20px;`
  }
`

const Text: React.FC<TextProps> = (props) => {
  return <TextStyled {...props} data-testid="typography-text" />
}

Text.defaultProps = {
  as: 'p',
  weight: 'regular',
  decoration: 'none',
  size: 'md',
  isOverline: false,
}

export default Text