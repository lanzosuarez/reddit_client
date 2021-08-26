import { FC } from "react";
import { Stack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchControversialPosts, useClient } from "contexts/Client";
import LoadPosts from "components/LoadPosts";
import Error from "components/Error";
import Post from "components/Post";
import Fetch from "components/Fetch";

const Hot: FC = () => {
  const client = useClient();
  const { isLoading, data, isError, error } = useQuery(
    "controversial_posts",
    () => fetchControversialPosts(client!)
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
            <Post category="controversial" key={post.id} post={post} />
          ))}
        </Stack>
      )}
    />
  );
};

export default Hot;
