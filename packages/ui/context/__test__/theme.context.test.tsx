import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "ui/context/theme.context";
import { Typography } from 'ui/components'


const { Text } = Typography;

describe("test theme context", () => {
  it("should render default", () => {
    render(
      <ThemeProvider>
        <Text>Hello world</Text>
      </ThemeProvider>
    );

    const context = screen.getByText("Hello world");
    expect(context).toBeInTheDocument();
  });
})