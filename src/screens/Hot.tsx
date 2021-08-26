import { FC } from "react";
import { Stack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchHotPosts, useClient } from "contexts/Client";
import LoadPosts from "components/LoadPosts";
import Error from "components/Error";
import Post from "components/Post";
import Fetch from "components/Fetch";

const Hot: FC = () => {
  const client = useClient();
  const { isLoading, data, isError, error } = useQuery("hot_posts", () =>
    fetchHotPosts(client!)
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
            <Post category="hot" key={post.id} post={post} />
          ))}
        </Stack>
      )}
    />
  );
};

export default Hot;
