import styled from '@emotion/styled'
import React from 'react'
import colors from 'ui/theme/colors'

type ButtonProps = JSX.IntrinsicElements['button'] & {
  children: React.ReactNode
  prefix?: React.ReactNode | React.ReactElement | JSX.Element
  suffix?: React.ReactNode
  isIcon?: boolean
  isOpacity?: boolean
}


const ButtonInnerStyled = styled.span<{ isIcon?: boolean }>`
  ${props => !props.isIcon && `
  font-family: 'Airbnb Cereal App';
  font-style: normal;
  font-weight: 700;
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
  outline: none;
  border: none;
  transition: ease-out 100ms;
  ${props => props.isIcon && `
  padding: 8px;
  border-radius: 32px;
  `}

${props => !props.isIcon && `
  border-radius: 12px;
  padding: 12px 16px;
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
`

const Button: React.FC<ButtonProps> = ({ suffix, prefix, children, isIcon, ...props }) => {
  return (
    <ButtonStyled {...props} isIcon={isIcon} data-testid="button">
      {!!prefix && prefix}
      <ButtonInnerStyled isIcon={isIcon}>
        {children}
      </ButtonInnerStyled>
      {!!suffix && suffix}
    </ButtonStyled>
  )
}

Button.defaultProps = {
  type: 'button',
  isIcon: false,
}

export default Button