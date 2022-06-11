import { decodeRoute, encodeRoute } from "../src/utils";

describe("Encode Route", () => {
  it("should encode a route", () => {
    expect(encodeRoute("/test.com?a=2.2")).toBe("=test(com)a^2(2");
  });
});

describe("Decode Route", () => {
  it("should encode a route", () => {
    expect(decodeRoute("=test(com)a^2(2")).toBe("/test.com?a=2.2");
  });
});
