import { render } from '@testing-library/react'
import { Chip } from '.'

describe("Chip", () => {
  it("should render Chip component", () => {
    const { getByTestId } = render(<Chip>Chip</Chip>)
    const chip = getByTestId("chip")
    expect(chip).toBeInTheDocument()
  })
})