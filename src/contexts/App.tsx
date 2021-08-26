import { FC } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ClientProvider from "contexts/Client";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();
const AppProvider: FC = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ClientProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </ClientProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
