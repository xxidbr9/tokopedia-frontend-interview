import { render } from "@testing-library/react"
import { Body } from "./body"

describe("test body component", () => {
  it("should render default", () => {
    const testid = "fake-body"
    // fake body, not real body
    const { getByTestId } = render(<Body as="div" data-testid={testid}>Hello world</Body>);
    const body = getByTestId(testid);
    expect(body).toBeInTheDocument();
  })
})