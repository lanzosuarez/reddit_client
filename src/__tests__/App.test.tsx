import { waitFor } from "@testing-library/react";
import App from "App";
import { defineMatchMedia, render } from "test_utils";

describe("renders the <App/>", () => {
  beforeEach(() => {
    defineMatchMedia();
  });
  it("shows the nav", async () => {
    const { getByRole } = render(<App />);
    const nav = getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  it("it initially shows the main container with loading element", () => {
    const { getByRole, container } = render(<App />);
    const main = getByRole("main");
    expect(main).toBeInTheDocument();
    const loading = container.querySelector("main > .loadPosts");
    expect(loading).toBeInTheDocument();
  });

  it("it eventually shows hot posts container", async () => {
    const { container } = render(<App />);
    await waitFor(() => container.querySelector("main > .hotPosts"));
    expect(container.querySelector("main > .hotPosts"));
  });
});
