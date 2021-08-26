import { FC } from "react";
import { Stack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchNewPosts, useClient } from "contexts/Client";
import LoadPosts from "components/LoadPosts";
import Error from "components/Error";
import Post from "components/Post";
import Fetch from "components/Fetch";

const New: FC = () => {
  const client = useClient();
  const { isLoading, data, isError, error } = useQuery("new_posts", () =>
    fetchNewPosts(client!)
  );

  return (
    <Fetch
      data={data}
      error={error}
      isLoading={isLoading}
      isError={isError}
      renderError={() => {
        console.error(error);
        return <Error />;
      }}
      renderLoading={() => <LoadPosts />}
      renderSuccess={() => (
        <Stack>
          {data?.map((post) => (
            <Post category="new" key={post.id} post={post} />
          ))}
        </Stack>
      )}
    />
  );
};

export default New;
