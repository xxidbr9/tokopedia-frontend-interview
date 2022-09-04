// const ampValidator = require("amphtml-validator");

const withTM = require("next-transpile-modules")(["ui"]);

const IS_DEV = process.env.NODE_ENV !== "production";

const config = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   forceSwcTransforms: true
  // }
  // amp: {
  //   validator: ampValidator
  // },
  experimental: {
    amp: {
      skipValidation: true
    }
  }
};

module.exports = withTM(config);
