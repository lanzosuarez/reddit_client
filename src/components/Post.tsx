import { FC, memo } from "react";
import {
  Box,
  Stack,
  Icon,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  useClipboard,
  Image,
  useToast,
} from "@chakra-ui/react";
import { Submission } from "snoowrap";
import { MdShare, MdModeComment, MdContentCopy } from "react-icons/md";
import { useHistory } from "react-router";
import { formatFromNow } from "helpers";
import { REDDIT_URL } from "global";

const Action: FC = ({ children }) => (
  <Flex alignItems="center" _hover={{ textDecor: "underline" }}>
    {children}
  </Flex>
);

const Post: FC<{ post: Submission; category: string }> = ({
  post: {
    title,
    created,
    author,
    num_comments,
    url,
    permalink,
    id,
    thumbnail,
    setSuggestedSort,
  },
  category,
}) => {
  const history = useHistory();
  const { onCopy } = useClipboard(`${REDDIT_URL}/${permalink}`);
  const toast = useToast();

  const handleCopy = () => {
    onCopy();
    toast({
      description: "Link copied!",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <Box
      onClick={() => history.push(`/${category}/${id}`)}
      cursor="pointer"
      p="4"
      maxW="sm"
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
    >
      {thumbnail === "image" && <Image src={url} alt="post banner" />}
      <Box mt="1" fontWeight="light" as="h6" fontSize="xs">
        Posted by {author.name} {formatFromNow(created * 1000)} ago
      </Box>
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
        {title}
      </Box>
      <Stack mt="4" direction="row" fontSize="sm" spacing="4">
        <Action>
          <Icon as={MdModeComment} mt="2px" mr="3px" />
          {num_comments.toLocaleString()} Comments
        </Action>
        <Menu isLazy placement="bottom-end">
          <MenuButton
            onClick={(e) => e.stopPropagation()}
            as={Button}
            variant="link"
            fontSize="sm"
            colorScheme="black"
            fontWeight="normal"
          >
            <Icon as={MdShare} mt="-2px" mr="3px" />
            Share
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleCopy} icon={<MdContentCopy />}>
              Copy Link
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Box>
  );
};

export default memo(Post);
