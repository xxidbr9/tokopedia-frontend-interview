import styled from '@emotion/styled'
import React from 'react'

type ContainerProps = {
  children: React.ReactNode
  fluid?: boolean
  isMobile?: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const ContainerStyled = styled.div<ContainerProps>`
  margin: auto;
  ${props => !props.fluid && `
  @media screen and (min-width: 1440px){
    max-width: 1264px;
  }
  
  @media screen and (min-width: 1024px) and (max-width: 1439px){
    padding: 0 16px;
  }
  `}

  ${props => props.isMobile && !props.fluid &&`
    padding-left: 20px;
    padding-right: 20px;
  `}
  
  ${props => props.fluid && `
  padding: 0;
  `}
`

const Container: React.FC<ContainerProps> = (props) => {
  return (
    <ContainerStyled {...props} data-testid="container">{props.children}</ContainerStyled>
  )
}

export default Container