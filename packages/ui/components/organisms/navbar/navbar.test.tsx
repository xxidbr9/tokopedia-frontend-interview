import { render } from "@testing-library/react";
import { Navbar } from ".";
import colors from "ui/theme/colors";

describe("Navbar", () => {
  it("should render successfully", () => {
    const { getByTestId } = render(<Navbar data-testid="navbar" />);
    const navbar = getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("should render when have props issScrolling", () => {
    const { getByTestId } = render(<Navbar data-testid="navbar" isScrolling />);
    const navbar = getByTestId("navbar");
    expect(navbar).toHaveStyle(`background-color: ${colors.surface};`);
  });

  it("should render when have props isMobile", () => {
    const { getByTestId } = render(<Navbar data-testid="navbar" isMobile />);
    const navbar = getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });
})