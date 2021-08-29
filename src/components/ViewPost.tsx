import { FC } from "react";
import { Listing, Comment, Sort } from "snoowrap";
import {
  Box,
  Stack,
  Image,
  Icon,
  Flex,
  Button,
  useBoolean,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  MdArrowUpward,
  MdArrowDownward,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import { Element } from "domhandler/lib/node";
import { formatFromNow } from "helpers";
import { useHistory } from "react-router";
import { REDDIT_URL } from "global";

const SortBy: FC<{ onSelectItem: (sort: Sort) => void }> = ({
  onSelectItem,
}) => {
  return (
    <Menu>
      <MenuButton
        size="sm"
        variant="ghost"
        as={Button}
        rightIcon={<MdKeyboardArrowDown />}
      >
        Sort By
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectItem("confidence")}>
          Confidence
        </MenuItem>
        <MenuItem onClick={() => onSelectItem("top")}>Top</MenuItem>
        <MenuItem onClick={() => onSelectItem("new")}>New</MenuItem>
        <MenuItem onClick={() => onSelectItem("old")}>Old</MenuItem>
        <MenuItem onClick={() => onSelectItem("random")}>Random</MenuItem>
        <MenuItem onClick={() => onSelectItem("qa")}>QA</MenuItem>
      </MenuList>
    </Menu>
  );
};

const parserConfig: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.name === "a") {
      const anchor = domNode as Element;
      // transform url to reddit absolute url
      return (
        <a href={`${REDDIT_URL}${anchor.attribs.href}`}>
          {domToReact(anchor.children)}
        </a>
      );
    }
  },
};

const PostComment: FC<{ comment: Comment }> = ({
  comment: { author, body_html, ups, downs, created, author_fullname, replies },
}) => {
  const [expanded, toggleExpanded] = useBoolean(false);

  return (
    <Stack boxShadow="sm" borderWidth={1} borderRadius="lg" p="4">
      <Box as="h5" fontWeight="semibold" fontSize="16">
        {author.name}
      </Box>
      <Box mt="1" fontWeight="light" as="span" fontSize="xs">
        Posted by {author_fullname} {formatFromNow(created * 1000)} ago
      </Box>
      <Box fontSize="12" overflow="hidden">
        {parse(body_html, parserConfig)}
      </Box>
      <Stack direction="row" fontSize="sm">
        <Flex alignItems="center">
          <Icon as={MdArrowUpward} />
          {ups.toLocaleString()}
        </Flex>
        <Flex alignItems="center">
          <Icon as={MdArrowDownward} />
          {downs.toLocaleString()}
        </Flex>
      </Stack>
      {/* show see replies button if there are replies */}
      {!!replies.length && (
        <Button
          onClick={() => toggleExpanded.toggle()}
          variant="ghost"
          size="sm"
          rightIcon={
            <Icon as={expanded ? MdKeyboardArrowDown : MdKeyboardArrowUp} />
          }
        >
          See replies
        </Button>
      )}
      {expanded && replies.length && (
        <Stack>
          {replies.map((reply) => (
            <PostComment key={reply.id} comment={reply} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

const PostComments: FC<{
  comments: Listing<Comment>;
  count: number;
}> = ({ comments, count }) => {
  return (
    <Stack>
      <Flex justifyContent="space-between" alignItems="center">
        <Box as="h2" fontWeight="semibold" m="0">
          Comments ({count})
        </Box>
        <SortBy onSelectItem={(sort) => console.log(sort)} />
      </Flex>
      <Stack>
        {comments.map((comment) => (
          <PostComment key={comment.id} comment={comment} />
        ))}
      </Stack>
    </Stack>
  );
};

interface ViewPostProps {
  postData: {
    postTitle: string;
    postAuthor: string;
    postNumComments: number;
    postComments: Listing<Comment>;
    postThumbnail: string;
    postUrl: string;
    postCreated: number;
    postUpVotes: number;
    postDownVotes: number;
  };
}

const ViewPost: FC<ViewPostProps> = ({
  postData: {
    postTitle,
    postThumbnail,
    postUrl,
    postAuthor,
    postCreated,
    postUpVotes,
    postDownVotes,
    postComments,
    postNumComments,
  },
}) => {
  const history = useHistory();
  return (
    <Stack maxW="sm" spacing="4" p="4" className="view-post">
      <Button
        colorScheme="black"
        onClick={() => history.goBack()}
        left="0"
        leftIcon={<Icon as={MdKeyboardArrowLeft} />}
        variant="link"
        isFullWidth={false}
        alignSelf="start"
      >
        Back
      </Button>
      <Stack p="4" spacing="4" boxShadow="sm" borderWidth={1} borderRadius="lg">
        <Box as="h1" fontWeight="semibold" fontSize="xl">
          {postTitle}
        </Box>
        <Box mt="1" fontWeight="light" as="h6" fontSize="xs">
          Posted by {postAuthor} {formatFromNow(postCreated * 1000)} ago
        </Box>
        {postThumbnail === "image" && (
          <Image
            src={postUrl}
            alt="post thumbnail"
            objectFit="cover"
            h="300px"
          />
        )}
        <Stack direction="row" fontSize="sm">
          <Flex alignItems="center">
            <Icon as={MdArrowUpward} />
            {postUpVotes.toLocaleString()}
          </Flex>
          <Flex alignItems="center">
            <Icon as={MdArrowDownward} />
            {postDownVotes.toLocaleString()}
          </Flex>
        </Stack>
      </Stack>
      <PostComments comments={postComments} count={postNumComments} />
    </Stack>
  );
};

export default ViewPost;
