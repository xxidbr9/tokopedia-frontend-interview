// const ampValidator = require("amphtml-validator");

const withTM = require("next-transpile-modules")(["ui"]);
const withPWA = require("next-pwa")({ dest: "public" });
const runtimeCaching = require("next-pwa/cache");
const TerserPlugin = require("terser-webpack-plugin");

const IS_DEV = process.env.NODE_ENV !== "production";

const pwaConfig = {
  pwa: {
    sw: "/sw.js",
    disable: IS_DEV,
    dest: "./public",
    runtimeCaching,
    swSrc: "./public/worker-service.js",
    buildExcludes: [/middleware-manifest\.json$/],
    importScripts: [
      "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
    ]
  }
};

const config = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   forceSwcTransforms: true
  // }
  // amp: {
  //   validator: ampValidator
  // },
  images: {
    domains: ["source.unsplash.com", "s4.anilist.co"]
  },
  experimental: {
    amp: {
      skipValidation: true
    }
  },

  webpack: config => {
    const newConfig = config;

    newConfig.resolve.alias = {
      ...config.resolve.alias
    };

    if (process.env.NODE_ENV === "production") {
      newConfig.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ];
    }

    return newConfig;
  },
  ...withPWA(pwaConfig)
};

module.exports = withTM(config);
