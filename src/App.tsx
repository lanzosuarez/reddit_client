import { Box, Center } from "@chakra-ui/react";
import Routes from "Routes";
import Nav from "components/Nav";

const App = () => (
  <Box>
    <Nav />
    <Center as="main" className="appContainer" p="4">
      <Routes />
    </Center>
  </Box>
);

export default App;
