import React, { FC, createContext, useRef, useContext } from "react";
import Snoowrap from "snoowrap";

const ClientContext = createContext<Snoowrap | null>(null);

const ClientProvider: FC = ({ children }) => {
  const client = useRef(
    new Snoowrap({
      userAgent: "019fc8b0-0589-11ec-8628-4dc79b6eca27",
      clientId: process.env.REACT_APP_SNOOWRAP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_SNOOWRAP_CLIENT_SECRET,
      refreshToken: process.env.REACT_APP_SNOOWRAP_REFRESH_TOKEN,
      accessToken: process.env.REACT_APP_SNOOWRAP_ACCESS_TOKEN,
    })
  );

  return (
    <ClientContext.Provider value={client.current}>
      {children}
    </ClientContext.Provider>
  );
};

/**
 * Function for fetching Reddit Hottest Posts
 * @param client
 * @returns Array of reddit hottest posts
 */
export const fetchHotPosts = (client: Snoowrap) => client?.getHot();

/**
 * Function for fetching Reddit New Posts
 * @param client
 * @returns Array of reddit newest posts
 */
export const fetchNewPosts = (client: Snoowrap) => client?.getNew();

/**
 * Function for fetching Reddit top Posts
 * @param client
 * @returns Array of reddit top posts
 */
export const fetchTopPosts = (client: Snoowrap) => client?.getTop();

/**
 * Function for fetching Reddit most controversial Posts
 * @param client
 * @returns Array of reddit most controversial posts
 */
export const fetchControversialPosts = (client: Snoowrap) =>
  client?.getControversial(undefined);

/**
 * Function for a reddit post
 * @param client
 * @param submissionId
 * @returns a reddit post
 */
export const fetchSubmission = (client: Snoowrap, submissionId: string) =>
  client?.getSubmission(submissionId);

export const useClient = () => {
  const client = useContext(ClientContext);
  if (!client === undefined) {
    throw new Error("useClient must be used within a SnoowrapProvider");
  }

  return client;
};

export default ClientProvider;
