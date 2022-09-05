// custom body

import styled from "@emotion/styled";
import { cerealFontFace } from "ui/theme/fonts";
import theme from "ui/theme";

type BodyProps = {
  children?: React.ReactNode;
  theme?: typeof theme;
};

export const Body = styled.body<BodyProps>`
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.textPrimary};
  margin: 0;
  padding: 0;
  transition: background-color 0.2s ease-out, color 0.2s ease-out;
  font-family: 'Airbnb Cereal App';
  ${cerealFontFace}
  * {
    font-size: 100%;
    font-family: 'Airbnb Cereal App';
  }
`;

Body.defaultProps = {
  theme,
  children: null,
}