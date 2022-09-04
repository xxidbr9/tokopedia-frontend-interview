import { render } from "@testing-library/react";
import Title from "../typography-title";

describe("test typography-title component", () => {
  it("should render default", () => {
    const { getByTestId } = render(<Title>Title</Title>);
    const component = getByTestId("typography-title");
    expect(component).toHaveTextContent("Title");
  });
});
