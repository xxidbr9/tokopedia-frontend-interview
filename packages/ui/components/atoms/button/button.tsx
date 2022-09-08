import styled from '@emotion/styled'
import React from 'react'
import colors from 'ui/theme/colors'

type ButtonProps = {
  children: React.ReactNode
  prefixIcon?: React.ReactNode | React.ReactElement | JSX.Element
  suffixIcon?: React.ReactNode
  isIcon?: boolean
  isOpacity?: boolean
  variant?: 'primary' | 'danger' | 'link'
} & JSX.IntrinsicElements['button']


const ButtonInnerStyled = styled.span<{ isIcon?: boolean }>`
  ${props => !props.isIcon && `
  font-family: 'Airbnb Cereal App';
  font-style: normal;
  font-weight: inherit;
  font-size: 16px;
  line-height: 24px;
  `}
  ${props => props.isIcon && `
  margin: 0;
  padding: 0;
  line-height: 0;
  `}
`

const ButtonStyled = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
  /* outline: none; */
  border: none;
  transition: ease-out 100ms;
  font-weight: 700;

  ${props => props.isIcon && `
  padding: 8px;
  border-radius: 32px;
  `}

${props => !props.isIcon && `
  border-radius: 12px;
  padding: 12px 32px;
  gap: 8px;
  `}

${props => !props.disabled && `
  cursor: pointer;
  &:active{
    scale: .98;
  }
  background: ${props.isOpacity ? colors.onSurface : colors.primary};
  color: ${colors.textPrimary};
  `}

  ${props => props.disabled && `
  background: ${colors.disabled};
  color: ${colors.textSecondary};
  `}

  ${props => props.variant === 'danger' && `
  background: ${colors.danger};
  color: ${colors.textPrimary};
  `}

  ${props => props.variant === 'link' && `
  background: transparent;
  color: ${colors.primary};
  padding: 0;
  font-weight: 500;
  `}
`

const Button: React.FC<ButtonProps> = ({ suffixIcon, prefixIcon, children, isIcon, ...props }) => {
  return (
    <ButtonStyled isIcon={isIcon} data-testid="button" {...props}>
      {!!prefixIcon && prefixIcon}
      <ButtonInnerStyled isIcon={isIcon}>
        {children}
      </ButtonInnerStyled>
      {!!suffixIcon && suffixIcon}
    </ButtonStyled>
  )
}

Button.defaultProps = {
  type: 'button',
  isIcon: false,
  variant: 'primary',
}

export default Button