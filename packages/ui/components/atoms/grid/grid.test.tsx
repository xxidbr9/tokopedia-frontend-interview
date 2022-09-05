import { render } from "@testing-library/react";
import { Grid } from ".";

describe("Grid", () => {
  it("should render successfully", () => {
    const Comp = () => {
      return (
        <Grid>
          <Grid.Item>
            1
          </Grid.Item>
        </Grid>
      );
    };

    const { getByTestId } = render(<Comp />);
    const grid = getByTestId("grid");
    expect(grid).toBeInTheDocument();

    const gridItem = getByTestId("grid-item");
    expect(gridItem).toBeInTheDocument();
  });

  it("should render with span", () => {
    const Comp = () => {
      return (
        <Grid>
          <Grid.Item span={2}>
            1
          </Grid.Item>
        </Grid>
      );
    };

    const { getByTestId } = render(<Comp />);
    const gridItem = getByTestId("grid-item");
    expect(gridItem).toHaveStyle("grid-column: span 2;");
  });

  it("should render with offset", () => {
    const Comp = () => {
      return (
        <Grid>
          <Grid.Item span={2} offset={2}>
            1
          </Grid.Item>
        </Grid>
      );
    };

    const { getByTestId } = render(<Comp />);
    const gridItem = getByTestId("grid-item");
    expect(gridItem).toHaveStyle("grid-column: 3/span 2;");
  });
});