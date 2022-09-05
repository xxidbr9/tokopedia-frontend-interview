import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from ".";

describe("Pagination", () => {
  it("should render successfully", () => {
    const { getByTestId } = render(<Pagination count={15} defaultPage={1} onChange={jest.fn()} />);
    const pagination = getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });

  it("should render with defaultPage and prev is clicked", () => {
    render(<Pagination count={15} defaultPage={4} onChange={jest.fn()} />);
    fireEvent.click(screen.getByTestId("pagination-prev"));
  });

  it("should render with defaultPage and next is clicked", () => {
    render(<Pagination count={15} defaultPage={4} onChange={jest.fn()} />);
    fireEvent.click(screen.getByTestId("pagination-next"));
  });

  it("should render with defaultPage and page is clicked", () => {
    render(<Pagination count={15} defaultPage={4} onChange={jest.fn()} />);
    fireEvent.click(screen.getByTestId("pagination-page-5"));
  });

  it("should render with no props", () => {
    render(<Pagination onChange={jest.fn()}/>);
    fireEvent.click(screen.getByTestId("pagination-page-1"));
  });
})