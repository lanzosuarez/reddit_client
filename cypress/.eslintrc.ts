module.exports = {
  plugins: ["cypress"],
  extends: ["plugin:cypress/recommended"],
  rules: {
    "jest/expect-expect": "off",
  },
};
