import { content } from "../src";

jest.setTimeout(30000);

describe("Get Content", () => {
  test("should get content", async () => {
    const { current_url, innerHTML } = await content(
      "https://example.com",
      process.env.CHROME || ""
    );
    expect(innerHTML.length).toBeDefined();
    expect(current_url.length).toBeDefined();
    expect(innerHTML.length).toBeGreaterThan(0);
    expect(current_url.length).toBeGreaterThan(0);
  });
  test("should get content (opts)", async () => {
    const { current_url, innerHTML } = await content(
      "https://www.wikipedia.org",
      process.env.CHROME || "",
      {
        scripts: true,
        imgs: true,
      }
    );
    expect(innerHTML.length).toBeDefined();
    expect(current_url.length).toBeDefined();
    expect(innerHTML.length).toBeGreaterThan(0);
    expect(current_url.length).toBeGreaterThan(0);
  });
  test("should get content (scripts)", async () => {
    const { current_url, innerHTML } = await content(
      "https://example.com",
      process.env.CHROME || "",
      {
        action: async (page) => {
          await page.waitForTimeout(100);
        },
      }
    );
    expect(innerHTML.length).toBeDefined();
    expect(current_url.length).toBeDefined();
    expect(innerHTML.length).toBeGreaterThan(0);
    expect(current_url.length).toBeGreaterThan(0);
  });
});
