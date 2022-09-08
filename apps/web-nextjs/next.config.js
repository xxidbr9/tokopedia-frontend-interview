const withTM = require("next-transpile-modules")(["ui"]);
const runtimeCaching = require("next-pwa/cache");
const TerserPlugin = require("terser-webpack-plugin");

const IS_DEV = process.env.NODE_ENV !== "production";
const withPWA = require("next-pwa")({
  dest: "public",
  disable: IS_DEV,
  register: true
});

const pwaConfig = {
  pwa: {
    sw: "/sw.js",
    disable: IS_DEV,
    dest: "./public",
    runtimeCaching,
    swSrc: "./public/worker-service.js",
    buildExcludes: [/middleware-manifest\.json$/, /_buildManifest*/],
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
  compiler: {
    removeConsole: !IS_DEV
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

delete config.pwa;

module.exports = withTM(config);
