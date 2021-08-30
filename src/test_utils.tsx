import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ClientProvider from "contexts/Client";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();
const AllTheProviders: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ClientProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </ClientProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

export const defineMatchMedia = () =>
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

// override render method
export { customRender as render };
