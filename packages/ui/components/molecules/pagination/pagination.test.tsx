import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from ".";

describe("Pagination", () => {
  it("should render successfully", () => {
    const { getByTestId } = render(<Pagination position="center" total={15} pageSize={2} defaultPage={1} onChange={jest.fn()} />);
    const pagination = getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });

  it("should render with defaultPage and prev is clicked", () => {
    render(<Pagination position="center" total={15} pageSize={2} defaultPage={4} onChange={jest.fn()} />);
    const isClicked = fireEvent.click(screen.getByTestId("pagination-prev"));
    expect(isClicked).toBeTruthy();
  });

  it("should render with defaultPage and next is clicked", () => {
    render(<Pagination position="center" total={15} pageSize={2} defaultPage={4} onChange={jest.fn()} />);
    const isClicked = fireEvent.click(screen.getByTestId("pagination-next"));
    expect(isClicked).toBeTruthy();
  });

  it("should render with defaultPage and page is clicked", () => {
    render(<Pagination position="center" total={15} pageSize={2} defaultPage={4} onChange={jest.fn()} />);
    const isClicked = fireEvent.click(screen.getByTestId("pagination-page-5"));
    expect(isClicked).toBeTruthy();
  });

  it("should render with no props", () => {
    render(<Pagination position="center" onChange={jest.fn()} />);
    const isClicked = fireEvent.click(screen.getByTestId("pagination-page-1"));
    expect(isClicked).toBeTruthy();
  });

  it("should render with defaultPage and last page is clicked", () => {
    render(<Pagination total={10} position="center" onChange={jest.fn()} />);
    const isClicked = fireEvent.click(screen.getByTestId("pagination-page-10"));
    expect(isClicked).toBeTruthy();
  });

  it("it should render in mobile", () => {
    render(<Pagination isMobile position="center" total={10} onChange={jest.fn()} />);
    const isClicked = fireEvent.click(screen.getByTestId("pagination-page-10"));
    expect(isClicked).toBeTruthy();
  });
})