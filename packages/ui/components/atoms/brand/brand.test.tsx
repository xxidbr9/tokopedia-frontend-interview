import { render } from "@testing-library/react";
import { Brand } from ".";

describe("Brand", () => {
  it("should render brand.tsx", () => {
    const { getAllByTestId } = render(<Brand />);
    const brand = getAllByTestId("brand");
    expect(brand).toBeTruthy();
  });
})