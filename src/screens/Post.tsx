import { FC } from "react";
import { fetchSubmission, useClient } from "contexts/Client";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import LoadPosts from "components/LoadPosts";
import Fetch from "components/Fetch";
import Error from "components/Error";
import ViewPost from "components/ViewPost";

/**
 * Post component
 */
const Post: FC = () => {
  const client = useClient();
  const { id: submissionId } = useParams<{ id: string }>();
  const { isLoading, data, isError, error } = useQuery(
    ["post", submissionId],
    () => fetchSubmission(client!, submissionId)
  );

  const {
    data: extractedData,
    isLoading: isExtractingData,
    isError: isExtractingError,
  } = useQuery(["post", submissionId, data], async () => {
    if (data) {
      const {
        title,
        author,
        num_comments,
        comments,
        thumbnail,
        url,
        created,
        ups,
        downs,
      } = data!;
      const [
        postTitle,
        postAuthor,
        postNumComments,
        postComments,
        postThumbnail,
        postUrl,
        postCreated,
        postUpVotes,
        postDownVotes,
      ] = await Promise.all([
        title,
        author.name,
        num_comments,
        comments,
        thumbnail,
        url,
        created,
        ups,
        downs,
      ]);
      return {
        postTitle,
        postAuthor,
        postNumComments,
        postComments,
        postThumbnail,
        postUrl,
        postCreated,
        postUpVotes,
        postDownVotes,
      };
    }
  });

  return (
    <Fetch
      isLoading={isLoading || isExtractingData}
      isError={isError || isExtractingError}
      renderError={() => {
        console.error(error);
        return <Error />;
      }}
      renderLoading={() => <LoadPosts />}
      renderSuccess={() => {
        if (extractedData) return <ViewPost postData={extractedData} />;
        return <LoadPosts />;
      }}
    />
  );
};

export default Post;
