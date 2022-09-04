import { render } from '@testing-library/react'
import Text from '../typography-text'

describe("test typography-text component", () => {
  it("should render default", () => {
    const { getByTestId } = render(<Text>Text</Text>);
    const component = getByTestId("typography-text");
    expect(component).toHaveTextContent("Text");
  });

  it("should render with overline", () => {
    const text = "Text";
    const { getByTestId } = render(<Text isOverline>{text}</Text>);
    const component = getByTestId("typography-text");
    expect(component).toHaveTextContent(text);
  })
})