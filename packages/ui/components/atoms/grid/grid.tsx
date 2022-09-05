import styled from "@emotion/styled";
import Item from "./grid-item";


type GridProps = {
  children: React.ReactNode;
  columns: 4 | 12;
  gap?: 20 | 24;
}

const GridStyled = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  width: 100%;
  column-gap: ${props => `${props.gap}px`};
`;



const Grid = (props: GridProps) => {
  return (
    <GridStyled {...props} data-testid="grid" />
  )
}

Grid.defaultProps = {
  columns: 12,
  gap: 24,
}

Grid.Item = Item;

export default Grid;