import { lazy } from "react";
import LoadPosts from "components/LoadPosts";
import { Suspense, FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// lazy load component, but prefetch them for much faster load time of pages
const Post = lazy(() => import(/*webpackPrefetch: true*/ "screens/Post"));
const Hot = lazy(() => import(/*webpackPrefetch: true*/ "screens/Hot"));
const Top = lazy(() => import(/*webpackPrefetch: true*/ "screens/Top"));
const New = lazy(() => import(/*webpackPrefetch: true*/ "screens/New"));
const Controversial = lazy(
  () => import(/*webpackPrefetch: true*/ "screens/Controversial")
);

const Suspended: FC = (props) => (
  <Suspense fallback={<LoadPosts />} {...props} />
);

/**
 * Add your routes here
 */
const Routes = () => (
  <Switch>
    <Redirect exact from="/" to="/hot" />
    <Route
      exact
      path="/hot"
      render={() => (
        <Suspended>
          <Hot />
        </Suspended>
      )}
    />
    <Route
      exact
      path="/top"
      render={() => (
        <Suspended>
          <Top />
        </Suspended>
      )}
    />
    <Route
      exact
      path="/new"
      render={() => (
        <Suspended>
          <New />
        </Suspended>
      )}
    />
    <Route
      exact
      path="/controversial"
      render={() => (
        <Suspended>
          <Controversial />
        </Suspended>
      )}
    />
    <Route
      path="/:category/:id"
      render={() => (
        <Suspended>
          <Post />
        </Suspended>
      )}
    />
  </Switch>
);

export default Routes;
