import { render } from "@testing-library/react";
import colors from "../../../theme/colors";
import { Button } from ".";

describe("Button", () => {
  it("should render", () => {
    const { getByTestId } = render(<Button>Button</Button>);
    const button = getByTestId("button");
    expect(button).toBeInTheDocument();
  });

  it("should render with children", () => {
    const { getByTestId } = render(<Button>Button</Button>);
    const button = getByTestId("button");
    expect(button).toHaveTextContent("Button");
  });

  it("should render with prefix", () => {
    const { getByTestId } = render(
      <Button prefixIcon={<div data-testid="prefix">Prefix</div>}>Button</Button>
    );
    const prefix = getByTestId("prefix");
    expect(prefix).toBeInTheDocument();
  });

  it("should render with suffix", () => {
    const { getByTestId } = render(
      <Button suffixIcon={<div data-testid="suffix">Suffix</div>}>Button</Button>
    );
    const suffix = getByTestId("suffix");
    expect(suffix).toBeInTheDocument();
  });

  it("should render with icon", () => {
    const { getByTestId } = render(
      <Button isIcon>
        <div data-testid="icon">Icon</div>
      </Button>
    );
    const icon = getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("should render with disabled", () => {
    const { getByTestId } = render(<Button disabled>Button</Button>);
    const button = getByTestId("button");
    expect(button).toHaveAttribute("disabled");
  });

  it("should render with opacity", () => {
    const { getByTestId } = render(<Button isOpacity>Button</Button>);
    const button = getByTestId("button");
    expect(button).toHaveStyle(`background: ${colors.onSurface}`);
  });

  it("should render with variant danger", () => {
    const { getByTestId } = render(<Button variant="danger">Button</Button>);
    const button = getByTestId("button");
    expect(button).toHaveStyle(`background: ${colors.danger}`);
  });

  it("should render with variant link", () => {
    const { getByTestId } = render(<Button variant="link">Button</Button>);
    const button = getByTestId("button");
    expect(button).toHaveStyle(`background: transparent`);
  });

});