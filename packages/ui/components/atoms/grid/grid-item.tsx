import React from 'react';
import styled from "@emotion/styled";


type ItemProps = {
  children: React.ReactNode;
  span?: number;
  offset?: number;
}

const ItemStyled = styled.div<ItemProps>`
  grid-column: span ${props => props.span || 1};
  ${props => !!props.offset && `grid-column: ${props.offset + 1} / span ${props.span};`}
`;


const Item: React.FC<ItemProps> = ({ offset, span, ...props }) => {
  return <ItemStyled
    data-testid="grid-item"
    offset={offset}
    span={span}
    {...props}
  />
}

export default Item