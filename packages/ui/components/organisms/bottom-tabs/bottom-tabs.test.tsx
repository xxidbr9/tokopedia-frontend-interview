import { render } from "@testing-library/react";
import { BottomTabs } from ".";

describe("BottomTabs", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <BottomTabs
        paths={{
          home: {
            href: "/",
          },
          search: {
            href: "/search",
          },
          collection: {
            href: "/collection",
          },
        }}
        activePath="home"
        linkAs={"a"}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
