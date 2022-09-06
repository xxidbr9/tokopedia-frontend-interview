module.exports = {
  root: true,
  extends: ["weboo", "next","turbo"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "turbo/no-undeclared-env-vars": "error"
  }  
};
