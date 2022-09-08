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
    const { getByTestId } = render(<Navbar data-testid="navbar" isScrolling linkAs="a"/>);
    const navbar = getByTestId("navbar");
    expect(navbar).toHaveStyle(`background-color: ${colors.surface};`);
  });

  it("should render when have props isMobile", () => {
    const { getByTestId } = render(<Navbar data-testid="navbar" isMobile linkAs="a"/>);
    const navbar = getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("should render when have props linkAs", () => {
    const { getByTestId } = render(<Navbar data-testid="navbar" linkAs="div"/>);
    const navbar = getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });


})