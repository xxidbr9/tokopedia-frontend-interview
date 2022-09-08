import { render } from "@testing-library/react";
import { DeleteIcon } from "..";

describe("DeleteIcon", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<DeleteIcon />);
    expect(baseElement).toBeTruthy();
  });
})