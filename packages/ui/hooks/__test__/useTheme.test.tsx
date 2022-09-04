import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "ui/context/theme.context";
import { Typography } from 'ui/components'
import { useTheme } from "ui/hooks";

const { Text } = Typography;
const text = "Hello world"
const Child = () => {
  useTheme()
  return (
    <Text>{text}</Text>
  )
}

const customRender = (ui: React.ReactNode, { ...renderOptions }) => {
  return render(
    <ThemeProvider>{ui}</ThemeProvider>,
    renderOptions
  );
};

let fakeUseContext: jest.Mock;
let realUseContext: typeof React.useContext;
beforeEach(() => {
  realUseContext = React.useContext;
  fakeUseContext = React.useContext = jest.fn();
});

afterEach(() => {
  React.useContext = realUseContext;
});


// silent error console
let consoleError: jest.Mock
beforeAll(() => {
  jest.spyOn(console, "error")
  consoleError = console.error as jest.Mock
  consoleError.mockImplementation(() => { })
})

describe("test useTheme", () => {
  it("should render", () => {
    React.useContext = realUseContext;
    customRender(<Child />, {});

    const context = screen.getByText(text);
    expect(context).toBeInTheDocument();
  });


  it("should throw error ", () => {
    try {
      customRender(<Child />, {})
    } catch (err) {
      expect(err).toEqual(new Error("useTheme must be used within a ThemeProvider"));
    }
  })
})