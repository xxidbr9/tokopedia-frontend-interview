import { render } from "@testing-library/react";
import { Modal } from ".";
import ReactModal from "react-modal";

describe("Modal", () => {
  it("should render modal", () => {
    const modalRoot = document.createElement("div");
    ReactModal.setAppElement(modalRoot);
    const { container } = render(<Modal isOpen={true} />, {
      container: document.body.appendChild(modalRoot),
    });
    expect(container).toBeInTheDocument();
  });
})