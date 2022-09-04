import styled from '@emotion/styled'
import React from 'react'

type ContainerProps = {
  children: React.ReactNode
  fluid?: boolean
}

const ContainerStyled = styled.div<ContainerProps>`
  margin: auto;
  ${props => !props.fluid && `
  padding:0 4%;
  @media screen and (min-width: 1500px){
    padding: 0 62px;
  }`}

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