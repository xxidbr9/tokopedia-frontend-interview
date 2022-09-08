import { render } from "@testing-library/react";
import { EditIcon } from "..";

describe("EditIcon", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<EditIcon />);
    expect(baseElement).toBeTruthy();
  });
});