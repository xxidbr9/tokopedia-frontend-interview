import { render } from "@testing-library/react";
import { PlayIcon } from "ui/icons";

describe("Play Icon", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<PlayIcon />);
    expect(baseElement).toBeTruthy();
  });
})
