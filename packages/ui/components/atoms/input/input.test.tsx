import { render } from "@testing-library/react";
import { Input } from ".";

describe("Input", () => {
  it("should render successfully", () => {
    const { getByTestId } = render(<Input label="OK" />);
    const input = getByTestId("input");
    expect(input).toBeInTheDocument();
  });
});