import { FC } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

/**
 *
 *  Error component for error state
 *
 */

const Error: FC<{
  title?: string;
  message?: string;
}> = ({ title = "Ooops!", message = "Something went wrong" }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default Error;
