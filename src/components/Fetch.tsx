import { FC } from "react";

interface FetchProps {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  data?: unknown;
  renderLoading: (isLoading?: boolean) => JSX.Element;
  renderSuccess: (data?: unknown) => JSX.Element;
  renderError: (error?: unknown) => JSX.Element;
}

const Fetch: FC<FetchProps> = ({
  isLoading,
  isError,
  renderLoading,
  renderSuccess,
  renderError,
  error,
  data,
}) => {
  if (isLoading) {
    return <>{renderLoading(isLoading)}</>;
  }

  if (isError) {
    return <>{renderError(error)}</>;
  }

  return <>{renderSuccess(data)}</>;
};

export default Fetch;
