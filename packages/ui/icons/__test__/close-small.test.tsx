import { render } from "@testing-library/react";
import { CloseSmallIcon } from "..";

describe("CloseSmallIcon", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CloseSmallIcon />);
    expect(baseElement).toBeTruthy();
  })
});