import { Center, Stack } from "@chakra-ui/react";
import Routes from "Routes";
import Nav from "components/Nav";

const App = () => {
  return (
    <>
      <Nav />
      <Center>
        <Stack p="4">
          <Routes />
        </Stack>
      </Center>
    </>
  );
};

export default App;
