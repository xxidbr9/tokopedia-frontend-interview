import { render } from "@testing-library/react";
import { Container } from ".";

describe("Container", () => {
  it("should render successfully", () => {
    const { getByTestId } = render(<Container>OK</Container>);
    const container = getByTestId("container");
    expect(container).toBeInTheDocument();
  });

  it("should render in fluid mode", () => {
    const { getByTestId } = render(<Container fluid>OK</Container>);
    const container = getByTestId("container");
    expect(container).toHaveStyle("padding: 0;");
  });

  it("should render in mobile mode", () => {
    const { getByTestId } = render(<Container isMobile>OK</Container>);
    const container = getByTestId("container");
    expect(container).toHaveStyle(`
      padding-left: 20px;
      padding-right: 20px;
    `);
  });
})