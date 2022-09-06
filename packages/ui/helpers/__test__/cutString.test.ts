import helpers from "ui/helpers";

describe("cutString", () => {
  it("should cut string", () => {
    expect(helpers.cutString("hello", 3)).toBe("hel....");
  });

  it("should not cut string", () => {
    expect(helpers.cutString("hello")).toBe("hello");
  })
});