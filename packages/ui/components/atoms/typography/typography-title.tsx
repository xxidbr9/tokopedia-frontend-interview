import styled from '@emotion/styled'
import React from 'react'

type TitleAsType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type TitleWeightType = 'bold' | 'medium' | 'regular'

export type TitleProps = {
  children?: React.ReactNode
  as?: TitleAsType
  weight?: TitleWeightType
}

const weightMap = {
  bold: 700,
  medium: 500,
  regular: 400,
}

const headingStyle: { [key in TitleAsType]: string } = {
  h1: `
  font-size: 36px;
  line-height: 44px;
  letter-spacing: -0.02em;  
  `,
  h2: `
  font-size: 32px;
  line-height: 40px;
  letter-spacing: -0.02em;
  `,
  h3: `
  font-size: 28px;
  line-height: 36px;
  letter-spacing: -0.02em;
  `,
  h4: `
  font-size: 24px;
  line-height: 32px;
  `,
  h5: `
  font-size: 20px;
  line-height: 28px;
  `,
  h6: `
  font-size: 18px;
  line-height: 24px;
  `,
}

const TitleStyled = styled.h1<TitleProps>`
  font-family: 'Airbnb Cereal App';
  font-style: normal;
  font-weight: ${(props) => weightMap[props.weight as TitleWeightType]};
  ${(props) => headingStyle[props.as as TitleAsType]}
`

const Title: React.FC<TitleProps> = (props) => {
  return <TitleStyled {...props} data-testid="typography-title" />
}

Title.defaultProps = {
  as: 'h1',
  weight: 'regular',
  children: null,
}

export default Title