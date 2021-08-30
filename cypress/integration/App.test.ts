/// <reference types="cypress" />

describe("App", () => {
  beforeEach(() => {
    // visit "/"
    cy.visit("/");
  });
  it("renders the App", () => {
    // nav should be rendered
    cy.get("nav").should("exist");
    // main should be rendered
    cy.get("main").should("exist");
    // "/" should redirected to "/hot"
    cy.url().should("include", "/hot");
    // should show loading
    cy.get("main > .loadPosts").should("exist");
    //should eventually show posts

    // Listen to get access token and get hot request
    cy.intercept({
      method: "POST",
      url: "https://www.reddit.com/api/v1/access_token",
    }).as("getToken");
    cy.intercept({
      method: "GET",
      url: " https://oauth.reddit.com/hot?raw_json=1&count=9999&t=",
    }).as("getPosts");

    cy.wait(["@getToken", "@getPosts"]);

    cy.get("main > .hotPosts").should("exist");
  });

  it.only("go to different page", () => {
    cy.intercept({
      method: "POST",
      url: "https://www.reddit.com/api/v1/access_token",
    }).as("getToken");
    cy.intercept({
      method: "GET",
      url: " https://oauth.reddit.com/hot?raw_json=1&count=9999&t=",
    }).as("getPosts");

    cy.wait(["@getToken", "@getPosts"]);

    cy.get("main > .hotPosts").should("exist");

    cy.get("nav a").eq(1).click();

    cy.url().should("include", "/top");

    cy.get("main > .loadPosts").should("exist");

    cy.get("main > .topPosts").should("exist");
  });
});
