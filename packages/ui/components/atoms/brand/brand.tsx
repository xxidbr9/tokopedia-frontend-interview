import styled from '@emotion/styled';
import React from 'react'
import { BrandIcon } from '.';

type BrandProps = {
  isLogo?: boolean
  width?: number
  height?: number
}

const BrandStyled = styled.div<BrandProps>`
  display: flex;
`;

const Brand: React.FC<BrandProps> = (props) => {
  return (
    <BrandStyled data-testid="brand">
      <BrandIcon
        width={props.width}
        height={props.height}

      />
    </BrandStyled>
  )
}

export default Brand