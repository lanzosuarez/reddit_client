# Setup

Follow these steps to successfully run the project

## Step 1

[Go here](https://not-an-aardvark.github.io/reddit-oauth-helper/) and generate
your access and refresh token. Be sure to check the `read` checkbox.

## Step 2

Create a .env file and supply the variables here

```bash
REACT_APP_SNOOWRAP_REFRESH_TOKEN=<your-refresh-token>
REACT_APP_SNOOWRAP_ACCESS_TOKEN=<your-access-token>
REACT_APP_SNOOWRAP_CLIENT_ID=<your-reddit-app-client-id>
REACT_APP_SNOOWRAP_CLIENT_SECRET=<your-reddit-app-client-secret>
```

## Step 3

Run `npm install` then after the installation run `yarn dev`
