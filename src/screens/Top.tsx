import { FC } from "react";
import { Stack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchTopPosts, useClient } from "contexts/Client";
import LoadPosts from "components/LoadPosts";
import Error from "components/Error";
import Post from "components/Post";
import Fetch from "components/Fetch";

const Top: FC = () => {
  const client = useClient();
  const { isLoading, data, isError, error } = useQuery("top_posts", () =>
    fetchTopPosts(client!)
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
        <Stack className="topPosts">
          {data?.map((post) => (
            <Post category="top" key={post.id} post={post} />
          ))}
        </Stack>
      )}
    />
  );
};

export default Top;
