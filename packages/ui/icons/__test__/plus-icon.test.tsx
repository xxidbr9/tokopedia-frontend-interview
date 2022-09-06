import { render } from "@testing-library/react";
import { PlusIcon } from "ui/icons";

describe("Plus Icon", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<PlusIcon />);
    expect(baseElement).toBeTruthy();
  });
})
