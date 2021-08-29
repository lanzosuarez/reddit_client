import { FC } from "react";
import { Box, SkeletonText, Stack } from "@chakra-ui/react";

const LoadPosts: FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <Stack aria-label="loading" aria-busy="true" className="loadPosts">
      {[...new Array(count)].map((_, i) => (
        <Box key={i} minW="sm" maxW="sm" padding="6" boxShadow="lg" bg="white">
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      ))}
    </Stack>
  );
};

export default LoadPosts;
