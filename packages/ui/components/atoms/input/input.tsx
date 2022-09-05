import styled from '@emotion/styled'
import React from 'react'
import colors from 'ui/theme/colors'

type InputProps = {
  label?: string
} & React.InputHTMLAttributes<HTMLInputElement>


const InputWrapperStyled = styled.div`
  display: inline-flex;
  flex-direction: column;
  label{
    font-size: 14px;
    font-weight: 700;
    color: ${colors.textPrimary};
    margin-bottom: 12px;
  }
`

const InputStyled = styled.input<InputProps>`
  background-color: ${colors.inputSurface};
  border-radius: 12px;
  padding: 12px 16px;
  outline: none;
  border: none;
  color: ${colors.textPrimary};
  font-size: 16px;
  line-height: 24px;
  ::placeholder {
    color: ${colors.textSecondary};
  }
`

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <InputWrapperStyled data-testid="input-wrapper">
      {!!label && <label>{label}</label>}
      <InputStyled {...props} data-testid="input" />
    </InputWrapperStyled>
  )
}

Input.defaultProps = {
  label: '',
}

export default Input