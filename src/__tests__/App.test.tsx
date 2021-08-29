import App from "App";
import { render } from "test_utils";

describe("renders the app", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  it("shows the nav", async () => {
    const { getByRole, debug } = render(<App />);
    const nav = getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });
  it.only("it shows loading", async () => {
    const { debug } = render(<App />);
    // const nav = getByRole("");
    // debug();
  });
});
